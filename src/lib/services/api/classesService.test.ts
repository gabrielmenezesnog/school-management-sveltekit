import { describe, expect, it, vi } from 'vitest';
import { APPLICATION_JSON_MIME_TYPE, CONTENT_TYPE_HEADER_NAME } from '$lib/constants/apiMediaTypes';
import { HTTP_CREATED, HTTP_OK } from '$lib/constants/httpStatus';
import { buildApiRequestUrl } from '$lib/services/api/apiClient';
import { classesService } from '$lib/services/api/classesService';
import type { SchoolClass } from '$lib/types/SchoolClass';
import type { SchoolClassCreateInput } from '$lib/types/SchoolClassCreateInput';

const SAMPLE_CLASS: SchoolClass = {
	id: 'c-101',
	schoolId: 'school-1',
	name: '1° A',
	grade: '1° Ano',
	level: 'fundamental_i',
	teacher: 'Maria Santos',
	students: 28,
	shift: 'manha',
	status: 'active'
};

const SAMPLE_CLASS_CREATE_INPUT: SchoolClassCreateInput = {
	schoolId: SAMPLE_CLASS.schoolId,
	name: SAMPLE_CLASS.name,
	grade: SAMPLE_CLASS.grade,
	level: SAMPLE_CLASS.level,
	teacher: SAMPLE_CLASS.teacher,
	students: SAMPLE_CLASS.students,
	shift: SAMPLE_CLASS.shift,
	status: SAMPLE_CLASS.status
};

function createJsonResponse(body: object, status = HTTP_OK): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			[CONTENT_TYPE_HEADER_NAME]: APPLICATION_JSON_MIME_TYPE
		}
	});
}

describe('classesService', () => {
	it('lists classes with GET /classes', async () => {
		const fetcher = vi.fn(async function mockListFetch(): Promise<Response> {
			return createJsonResponse([SAMPLE_CLASS]);
		});

		const schoolClasses = await classesService.list(fetcher);

		expect(schoolClasses).toEqual([SAMPLE_CLASS]);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes'),
			expect.objectContaining({})
		);
	});

	it('lists classes by school with GET /classes?schoolId=', async () => {
		const fetcher = vi.fn(async function mockListBySchoolFetch(): Promise<Response> {
			return createJsonResponse([SAMPLE_CLASS]);
		});

		const schoolClasses = await classesService.listBySchoolId('school-1', fetcher);

		expect(schoolClasses).toEqual([SAMPLE_CLASS]);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes?schoolId=school-1'),
			expect.objectContaining({})
		);
	});

	it('gets a class with GET /classes/:id', async () => {
		const fetcher = vi.fn(async function mockGetFetch(): Promise<Response> {
			return createJsonResponse(SAMPLE_CLASS);
		});

		const schoolClass = await classesService.get('c-101', fetcher);

		expect(schoolClass).toEqual(SAMPLE_CLASS);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes/c-101'),
			expect.objectContaining({})
		);
	});

	it('creates a class with POST /classes', async () => {
		const fetcher = vi.fn(async function mockCreateFetch(): Promise<Response> {
			return createJsonResponse(SAMPLE_CLASS, HTTP_CREATED);
		});

		const schoolClass = await classesService.create(SAMPLE_CLASS_CREATE_INPUT, fetcher);

		expect(schoolClass).toEqual(SAMPLE_CLASS);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes'),
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify(SAMPLE_CLASS_CREATE_INPUT)
			})
		);
	});

	it('updates a class with PUT /classes/:id', async () => {
		const updatedClass: SchoolClass = {
			...SAMPLE_CLASS,
			status: 'inactive'
		};

		const fetcher = vi.fn(async function mockUpdateFetch(): Promise<Response> {
			return createJsonResponse(updatedClass);
		});

		const schoolClass = await classesService.update('c-101', updatedClass, fetcher);

		expect(schoolClass).toEqual(updatedClass);
		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes/c-101'),
			expect.objectContaining({
				method: 'PUT',
				body: JSON.stringify(updatedClass)
			})
		);
	});

	it('removes a class with DELETE /classes/:id', async () => {
		const fetcher = vi.fn(async function mockRemoveFetch(): Promise<Response> {
			return createJsonResponse({});
		});

		await classesService.remove('c-101', fetcher);

		expect(fetcher).toHaveBeenCalledWith(
			buildApiRequestUrl('/classes/c-101'),
			expect.objectContaining({
				method: 'DELETE'
			})
		);
	});
});
