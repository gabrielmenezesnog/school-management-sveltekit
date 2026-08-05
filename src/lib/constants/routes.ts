export const HOME_ROUTE = '/';
export const SCHOOLS_ROUTE = '/schools';

export const MAIN_CONTENT_ID = 'main-content';

export function schoolDetailPath(schoolId: string): string {
	return `${SCHOOLS_ROUTE}/${schoolId}`;
}
