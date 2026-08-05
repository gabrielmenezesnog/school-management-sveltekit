import { SCHOOLS_FILTER_ALL_VALUE } from '$lib/features/schools/constants';
import type { SchoolsStatusFilterValue, SchoolsTypeFilterValue } from '$lib/features/schools/types';
import type { School } from '$lib/types/School';

export interface FilterSchoolsParams {
	schools: School[];
	searchQuery: string;
	typeFilter: SchoolsTypeFilterValue;
	statusFilter: SchoolsStatusFilterValue;
}

export function filterSchools({
	schools,
	searchQuery,
	typeFilter,
	statusFilter
}: FilterSchoolsParams): School[] {
	const normalizedQuery = searchQuery.trim().toLowerCase();

	return schools.filter(function matchesSchoolFilters(school): boolean {
		const hasMatchingSearch =
			!normalizedQuery ||
			school.name.toLowerCase().includes(normalizedQuery) ||
			school.principal.toLowerCase().includes(normalizedQuery) ||
			school.neighborhood.toLowerCase().includes(normalizedQuery) ||
			school.address.toLowerCase().includes(normalizedQuery);

		const hasMatchingType = typeFilter === SCHOOLS_FILTER_ALL_VALUE || school.type === typeFilter;

		const hasMatchingStatus =
			statusFilter === SCHOOLS_FILTER_ALL_VALUE || school.status === statusFilter;

		return hasMatchingSearch && hasMatchingType && hasMatchingStatus;
	});
}
