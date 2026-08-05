import type {
	SchoolsFilterOption,
	SchoolsStatusFilterValue,
	SchoolsTypeFilterValue
} from '$lib/features/schools/types';

export const SCHOOLS_FILTER_ALL_VALUE = 'all' as const;

export const SEARCH_ICON_SIZE_PX = 16;

export const SEARCH_CLEAR_ICON_SIZE_PX = 14;

export const HARDCODED_SCHOOLS_RESULT_COUNT = 0;

export const SCHOOL_TYPE_FILTER_OPTIONS: SchoolsFilterOption<SchoolsTypeFilterValue>[] = [
	{ value: SCHOOLS_FILTER_ALL_VALUE, label: 'All' },
	{ value: 'municipal', label: 'Municipal' },
	{ value: 'estadual', label: 'State' },
	{ value: 'federal', label: 'Federal' }
];

export const SCHOOL_STATUS_FILTER_OPTIONS: SchoolsFilterOption<SchoolsStatusFilterValue>[] = [
	{ value: SCHOOLS_FILTER_ALL_VALUE, label: 'All' },
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' }
];
