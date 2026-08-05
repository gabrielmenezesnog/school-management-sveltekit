import { describe, expect, it, vi } from 'vitest';
import { API_UNAVAILABLE_MESSAGE } from '$lib/constants/apiAvailability';
import {
	ACCEPT_HEADER_NAME,
	APPLICATION_JSON_MIME_TYPE,
	CONTENT_TYPE_HEADER_NAME
} from '$lib/constants/apiMediaTypes';
import { HTTP_OK, HTTP_SERVICE_UNAVAILABLE } from '$lib/constants/httpStatus';
import { apiClient, buildApiRequestUrl } from '$lib/services/api/apiClient';

describe('apiClient', () => {
	it('maps network failures to a service unavailable error', async () => {
		const fetcher = vi.fn(async function mockFailedFetch(): Promise<Response> {
			throw new TypeError('fetch failed');
		});

		await expect(apiClient('/schools', undefined, fetcher)).rejects.toMatchObject({
			name: 'ApiRequestError',
			message: API_UNAVAILABLE_MESSAGE,
			status: HTTP_SERVICE_UNAVAILABLE
		});

		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/schools'),
			expect.objectContaining({
				headers: expect.objectContaining({
					[ACCEPT_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE,
					[CONTENT_TYPE_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE
				})
			})
		);
	});

	it('returns parsed JSON for successful responses', async () => {
		const fetcher = vi.fn(async function mockOkFetch(): Promise<Response> {
			return new Response(JSON.stringify([{ id: 'school-1' }]), {
				status: HTTP_OK,
				headers: {
					[CONTENT_TYPE_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE
				}
			});
		});

		const payload = await apiClient<Array<{ id: string }>>('/schools', undefined, fetcher);

		expect(payload).toEqual([{ id: 'school-1' }]);
	});
});
