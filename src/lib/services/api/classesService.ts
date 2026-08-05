import { apiClient, apiClientNoContent, type ApiFetcher } from '$lib/services/api/apiClient';
import type { SchoolClass } from '$lib/types/SchoolClass';
import type { SchoolClassCreateInput } from '$lib/types/SchoolClassCreateInput';
import type { SchoolClassUpdateInput } from '$lib/types/SchoolClassUpdateInput';

const CLASSES_RESOURCE_PATH = '/classes';

async function list(fetcher?: ApiFetcher): Promise<SchoolClass[]> {
	return apiClient<SchoolClass[]>(CLASSES_RESOURCE_PATH, undefined, fetcher);
}

async function listBySchoolId(schoolId: string, fetcher?: ApiFetcher): Promise<SchoolClass[]> {
	const searchParams = new URLSearchParams({ schoolId });

	return apiClient<SchoolClass[]>(
		`${CLASSES_RESOURCE_PATH}?${searchParams.toString()}`,
		undefined,
		fetcher
	);
}

async function get(classId: string, fetcher?: ApiFetcher): Promise<SchoolClass> {
	return apiClient<SchoolClass>(`${CLASSES_RESOURCE_PATH}/${classId}`, undefined, fetcher);
}

async function create(
	schoolClass: SchoolClassCreateInput,
	fetcher?: ApiFetcher
): Promise<SchoolClass> {
	return apiClient<SchoolClass>(
		CLASSES_RESOURCE_PATH,
		{
			method: 'POST',
			body: JSON.stringify(schoolClass)
		},
		fetcher
	);
}

async function update(
	classId: string,
	schoolClass: SchoolClassUpdateInput,
	fetcher?: ApiFetcher
): Promise<SchoolClass> {
	return apiClient<SchoolClass>(
		`${CLASSES_RESOURCE_PATH}/${classId}`,
		{
			method: 'PUT',
			body: JSON.stringify(schoolClass)
		},
		fetcher
	);
}

async function remove(classId: string, fetcher?: ApiFetcher): Promise<void> {
	await apiClientNoContent(
		`${CLASSES_RESOURCE_PATH}/${classId}`,
		{
			method: 'DELETE'
		},
		fetcher
	);
}

export const classesService = {
	list,
	listBySchoolId,
	get,
	create,
	update,
	remove
};
