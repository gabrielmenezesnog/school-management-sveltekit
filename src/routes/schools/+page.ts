import { API_UNAVAILABLE_MESSAGE } from '$lib/constants/apiAvailability';
import { buildClassCountBySchoolId } from '$lib/features/classes/buildClassCountBySchoolId';
import type { ClassCountBySchoolId } from '$lib/features/classes/types';
import { ApiRequestError } from '$lib/services/api/ApiRequestError';
import { classesService } from '$lib/services/api/classesService';
import { schoolsService } from '$lib/services/api/schoolsService';
import type { School } from '$lib/types/School';
import type { PageLoad, PageLoadEvent } from './$types';

export interface SchoolsPageLoadResult {
	schools: School[];
	classCountBySchoolId: ClassCountBySchoolId;
	apiUnavailableMessage: string | null;
}

function getApiUnavailableMessage(loadError: Error): string {
	if (loadError instanceof ApiRequestError) {
		return loadError.message;
	}

	if (loadError.message) {
		return loadError.message;
	}

	return API_UNAVAILABLE_MESSAGE;
}

export const load: PageLoad = async function loadSchoolsPage({
	fetch
}: PageLoadEvent): Promise<SchoolsPageLoadResult> {
	try {
		const [schools, schoolClasses] = await Promise.all([
			schoolsService.list(fetch),
			classesService.list(fetch)
		]);

		return {
			schools,
			classCountBySchoolId: buildClassCountBySchoolId(schoolClasses),
			apiUnavailableMessage: null
		};
	} catch (loadError) {
		if (loadError instanceof Error) {
			return {
				schools: [],
				classCountBySchoolId: {},
				apiUnavailableMessage: getApiUnavailableMessage(loadError)
			};
		}

		return {
			schools: [],
			classCountBySchoolId: {},
			apiUnavailableMessage: API_UNAVAILABLE_MESSAGE
		};
	}
};
