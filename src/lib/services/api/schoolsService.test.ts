import { describe, expect, it, vi } from 'vitest';
import {
	ACCEPT_HEADER_NAME,
	APPLICATION_JSON_MIME_TYPE,
	CONTENT_TYPE_HEADER_NAME
} from '$lib/constants/apiMediaTypes';
import { HTTP_CREATED, HTTP_NOT_FOUND, HTTP_OK } from '$lib/constants/httpStatus';
import { ApiRequestError } from '$lib/services/api/ApiRequestError';
import { buildApiRequestUrl } from '$lib/services/api/apiClient';
import { schoolsService } from '$lib/services/api/schoolsService';
import type { School } from '$lib/types/School';
import type { SchoolCreateInput } from '$lib/types/SchoolCreateInput';

const SAMPLE_SCHOOL: School = {
	id: 'school-1',
	name: 'EMEF João XXIII',
	address: 'Rua das Flores, 234',
	neighborhood: 'Centro',
	city: 'São Paulo',
	phone: '(11) 3211-4500',
	email: 'joaoxxiii@edu.sp.gov.br',
	principal: 'Maria Aparecida Silva',
	type: 'municipal',
	status: 'active',
	createdAt: '2018-03-12'
};

const SAMPLE_SCHOOL_CREATE_INPUT: SchoolCreateInput = {
	name: SAMPLE_SCHOOL.name,
	address: SAMPLE_SCHOOL.address,
	neighborhood: SAMPLE_SCHOOL.neighborhood,
	city: SAMPLE_SCHOOL.city,
	phone: SAMPLE_SCHOOL.phone,
	email: SAMPLE_SCHOOL.email,
	principal: SAMPLE_SCHOOL.principal,
	type: SAMPLE_SCHOOL.type,
	status: SAMPLE_SCHOOL.status,
	createdAt: SAMPLE_SCHOOL.createdAt
};

function createJsonResponse(body: object | string, status = HTTP_OK): Response {
	const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

	return new Response(responseBody, {
		status,
		headers: {
			[CONTENT_TYPE_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE
		}
	});
}

describe('schoolsService', () => {
	it('lists schools with GET /schools', async () => {
		const fetcher = vi.fn(async function mockListFetch(): Promise<Response> {
			return createJsonResponse([SAMPLE_SCHOOL]);
		});

		const schools = await schoolsService.list(fetcher);

		expect(schools).toEqual([SAMPLE_SCHOOL]);
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

	it('gets a school with GET /schools/:id', async () => {
		const fetcher = vi.fn(async function mockGetFetch(): Promise<Response> {
			return createJsonResponse(SAMPLE_SCHOOL);
		});

		const school = await schoolsService.get('school-1', fetcher);

		expect(school).toEqual(SAMPLE_SCHOOL);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/schools/school-1'),
			expect.objectContaining({})
		);
	});

	it('creates a school with POST /schools', async () => {
		const fetcher = vi.fn(async function mockCreateFetch(): Promise<Response> {
			return createJsonResponse(SAMPLE_SCHOOL, HTTP_CREATED);
		});

		const school = await schoolsService.create(SAMPLE_SCHOOL_CREATE_INPUT, fetcher);

		expect(school).toEqual(SAMPLE_SCHOOL);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/schools'),
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify(SAMPLE_SCHOOL_CREATE_INPUT)
			})
		);
	});

	it('updates a school with PUT /schools/:id', async () => {
		const updatedSchool: School = {
			...SAMPLE_SCHOOL,
			status: 'inactive'
		};

		const fetcher = vi.fn(async function mockUpdateFetch(): Promise<Response> {
			return createJsonResponse(updatedSchool);
		});

		const school = await schoolsService.update('school-1', updatedSchool, fetcher);

		expect(school).toEqual(updatedSchool);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/schools/school-1'),
			expect.objectContaining({
				method: 'PUT',
				body: JSON.stringify(updatedSchool)
			})
		);
	});

	it('removes a school with DELETE /schools/:id', async () => {
		const fetcher = vi.fn(async function mockRemoveFetch(): Promise<Response> {
			return createJsonResponse({});
		});

		await schoolsService.remove('school-1', fetcher);

		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/schools/school-1'),
			expect.objectContaining({
				method: 'DELETE'
			})
		);
	});

	it('throws ApiRequestError when the API responds with an error', async () => {
		const fetcher = vi.fn(async function mockErrorFetch(): Promise<Response> {
			return createJsonResponse({ message: 'School not found' }, HTTP_NOT_FOUND);
		});

		await expect(schoolsService.get('missing', fetcher)).rejects.toBeInstanceOf(ApiRequestError);
	});
});
