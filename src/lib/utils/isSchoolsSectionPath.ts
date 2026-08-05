import { SCHOOLS_ROUTE } from '$lib/constants/routes';

export function isSchoolsSectionPath(pathname: string): boolean {
	if (pathname === SCHOOLS_ROUTE) {
		return true;
	}

	return pathname.startsWith(`${SCHOOLS_ROUTE}/`);
}
