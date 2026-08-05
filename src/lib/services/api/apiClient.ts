import { PUBLIC_API_BASE_URL } from '$env/static/public';
import {
	ACCEPT_HEADER_NAME,
	APPLICATION_JSON_MIME_TYPE,
	CONTENT_TYPE_HEADER_NAME
} from '$lib/constants/apiMediaTypes';
import {
	HTTP_INTERNAL_SERVER_ERROR,
	HTTP_NO_CONTENT,
	HTTP_RESET_CONTENT
} from '$lib/constants/httpStatus';
import { ApiRequestError } from '$lib/services/api/ApiRequestError';
import { getApiErrorMessage } from '$lib/utils/getApiErrorMessage';

export type ApiFetcher = typeof fetch;

const TRAILING_SLASH_REGEX = /\/$/;

function getApiBaseUrl(): string {
	if (!PUBLIC_API_BASE_URL) {
		throw new ApiRequestError('API base URL is not configured', HTTP_INTERNAL_SERVER_ERROR);
	}

	return PUBLIC_API_BASE_URL.replace(TRAILING_SLASH_REGEX, '');
}

export function buildApiRequestUrl(path: string): string {
	return `${getApiBaseUrl()}${path}`;
}

async function request(
	path: string,
	init: RequestInit | undefined,
	fetcher: ApiFetcher
): Promise<Response> {
	const response = await fetcher(buildApiRequestUrl(path), {
		...init,
		headers: {
			[ACCEPT_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE,
			[CONTENT_TYPE_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE,
			...init?.headers
		}
	});

	if (!response.ok) {
		const message = await getApiErrorMessage(response);

		throw new ApiRequestError(message, response.status);
	}

	return response;
}

function isNoContentStatus(status: number): boolean {
	return status === HTTP_NO_CONTENT || status === HTTP_RESET_CONTENT;
}

export async function apiClient<TResponse>(
	path: string,
	init?: RequestInit,
	fetcher: ApiFetcher = fetch
): Promise<TResponse> {
	const response = await request(path, init, fetcher);

	if (isNoContentStatus(response.status)) {
		throw new ApiRequestError('Expected a response body', response.status);
	}

	const responseText = await response.text();

	if (!responseText) {
		throw new ApiRequestError('Expected a response body', response.status);
	}

	return JSON.parse(responseText) as TResponse;
}

export async function apiClientNoContent(
	path: string,
	init?: RequestInit,
	fetcher: ApiFetcher = fetch
): Promise<void> {
	const response = await request(path, init, fetcher);

	await response.text();
}
