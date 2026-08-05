import { error } from '@sveltejs/kit';
import { API_UNAVAILABLE_MESSAGE } from '$lib/constants/apiAvailability';
import {
	HTTP_INTERNAL_SERVER_ERROR,
	HTTP_NOT_FOUND,
	HTTP_SERVICE_UNAVAILABLE
} from '$lib/constants/httpStatus';
import { ApiRequestError } from '$lib/services/api/ApiRequestError';
import { classesService } from '$lib/services/api/classesService';
import { schoolsService } from '$lib/services/api/schoolsService';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async function loadSchoolDetailPage({
	fetch,
	params
}: PageLoadEvent) {
	try {
		const [school, schoolClasses] = await Promise.all([
			schoolsService.get(params.id, fetch),
			classesService.listBySchoolId(params.id, fetch)
		]);

		return {
			school,
			schoolClasses
		};
	} catch (loadError) {
		if (loadError instanceof ApiRequestError) {
			if (loadError.status === HTTP_NOT_FOUND) {
				error(HTTP_NOT_FOUND, 'School not found');
			}

			if (loadError.status === HTTP_SERVICE_UNAVAILABLE) {
				error(HTTP_SERVICE_UNAVAILABLE, loadError.message);
			}

			error(loadError.status, loadError.message);
		}

		if (loadError instanceof Error) {
			if (loadError.message) {
				error(HTTP_SERVICE_UNAVAILABLE, loadError.message);
			}

			error(HTTP_SERVICE_UNAVAILABLE, API_UNAVAILABLE_MESSAGE);
		}

		error(HTTP_INTERNAL_SERVER_ERROR, 'Failed to load school');
	}
};
