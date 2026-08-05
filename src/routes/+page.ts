import { redirect } from '@sveltejs/kit';
import { SCHOOLS_ROUTE } from '$lib/constants/routes';
import type { PageLoad } from './$types';

export const load: PageLoad = function load() {
	redirect(302, SCHOOLS_ROUTE);
};
