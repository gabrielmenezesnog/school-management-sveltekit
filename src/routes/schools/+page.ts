import { error } from '@sveltejs/kit';
import { HTTP_INTERNAL_SERVER_ERROR } from '$lib/constants/httpStatus';
import { buildClassCountBySchoolId } from '$lib/features/classes/buildClassCountBySchoolId';
import { ApiRequestError } from '$lib/services/api/ApiRequestError';
import { classesService } from '$lib/services/api/classesService';
import { schoolsService } from '$lib/services/api/schoolsService';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async function loadSchoolsPage({ fetch }: PageLoadEvent) {
	try {
		const [schools, schoolClasses] = await Promise.all([
			schoolsService.list(fetch),
			classesService.list(fetch)
		]);

		return {
			schools,
			classCountBySchoolId: buildClassCountBySchoolId(schoolClasses)
		};
	} catch (loadError) {
		if (loadError instanceof ApiRequestError) {
			error(loadError.status, loadError.message);
		}

		if (loadError instanceof Error) {
			error(HTTP_INTERNAL_SERVER_ERROR, loadError.message);
		}

		error(HTTP_INTERNAL_SERVER_ERROR, 'Failed to load schools');
	}
};
