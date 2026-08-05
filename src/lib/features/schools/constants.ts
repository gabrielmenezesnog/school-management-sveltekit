import { PAGINATION_DEFAULT_PER_PAGE } from '$lib/constants/pagination';
import type {
	SchoolsFilterOption,
	SchoolsStatusFilterValue,
	SchoolsTypeFilterValue
} from '$lib/features/schools/types';
import type { SchoolStatus, SchoolType } from '$lib/types/School';

export type SchoolTypeBadgeVariant = 'primary' | 'default' | 'warning';

export const SCHOOLS_FILTER_ALL_VALUE = 'all' as const;

export const SEARCH_ICON_SIZE_PX = 16;

export const SEARCH_CLEAR_ICON_SIZE_PX = 14;

export const SCHOOLS_TABLE_EMPTY_ICON_SIZE_PX = 48;

export const SCHOOLS_TABLE_MAP_PIN_ICON_SIZE_PX = 13;

export const SCHOOLS_TABLE_ACTION_ICON_SIZE_PX = 14;

export const SCHOOLS_TABLE_ADD_ICON_SIZE_PX = 16;

export const SCHOOLS_TABLE_COLUMN_COUNT = 7;

export const SCHOOLS_TABLE_PAGE_SIZE = PAGINATION_DEFAULT_PER_PAGE;

export const SCHOOLS_SINGULAR_COUNT = 1;

export const SCHOOLS_TABLE_SKELETON_ROW_COUNT = 5;

export const SCHOOL_TYPE_LABELS: Record<SchoolType, string> = {
	municipal: 'Municipal',
	estadual: 'State',
	federal: 'Federal'
};

export const SCHOOL_STATUS_LABELS: Record<SchoolStatus, string> = {
	active: 'Active',
	inactive: 'Inactive'
};

export const SCHOOL_TYPE_BADGE_VARIANT: Record<SchoolType, SchoolTypeBadgeVariant> = {
	municipal: 'primary',
	estadual: 'default',
	federal: 'warning'
};

export const SCHOOL_TYPE_FILTER_OPTIONS: SchoolsFilterOption<SchoolsTypeFilterValue>[] = [
	{ value: SCHOOLS_FILTER_ALL_VALUE, label: 'All' },
	{ value: 'municipal', label: SCHOOL_TYPE_LABELS.municipal },
	{ value: 'estadual', label: SCHOOL_TYPE_LABELS.estadual },
	{ value: 'federal', label: SCHOOL_TYPE_LABELS.federal }
];

export const SCHOOL_STATUS_FILTER_OPTIONS: SchoolsFilterOption<SchoolsStatusFilterValue>[] = [
	{ value: SCHOOLS_FILTER_ALL_VALUE, label: 'All' },
	{ value: 'active', label: SCHOOL_STATUS_LABELS.active },
	{ value: 'inactive', label: SCHOOL_STATUS_LABELS.inactive }
];
