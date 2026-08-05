import { apiClient, apiClientNoContent, type ApiFetcher } from '$lib/services/api/apiClient';
import type { School } from '$lib/types/School';
import type { SchoolCreateInput } from '$lib/types/SchoolCreateInput';
import type { SchoolUpdateInput } from '$lib/types/SchoolUpdateInput';

const SCHOOLS_RESOURCE_PATH = '/schools';

async function list(fetcher?: ApiFetcher): Promise<School[]> {
	return apiClient<School[]>(SCHOOLS_RESOURCE_PATH, undefined, fetcher);
}

async function get(schoolId: string, fetcher?: ApiFetcher): Promise<School> {
	return apiClient<School>(`${SCHOOLS_RESOURCE_PATH}/${schoolId}`, undefined, fetcher);
}

async function create(school: SchoolCreateInput, fetcher?: ApiFetcher): Promise<School> {
	return apiClient<School>(
		SCHOOLS_RESOURCE_PATH,
		{
			method: 'POST',
			body: JSON.stringify(school)
		},
		fetcher
	);
}

async function update(
	schoolId: string,
	school: SchoolUpdateInput,
	fetcher?: ApiFetcher
): Promise<School> {
	return apiClient<School>(
		`${SCHOOLS_RESOURCE_PATH}/${schoolId}`,
		{
			method: 'PUT',
			body: JSON.stringify(school)
		},
		fetcher
	);
}

async function remove(schoolId: string, fetcher?: ApiFetcher): Promise<void> {
	await apiClientNoContent(
		`${SCHOOLS_RESOURCE_PATH}/${schoolId}`,
		{
			method: 'DELETE'
		},
		fetcher
	);
}

export const schoolsService = {
	list,
	get,
	create,
	update,
	remove
};
