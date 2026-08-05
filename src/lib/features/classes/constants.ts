import type { SchoolClassLevel, SchoolClassShift, SchoolClassStatus } from '$lib/types/SchoolClass';

export const EMPTY_CLASS_COUNT = 0;

export const CLASS_COUNT_INCREMENT = 1;

export const CLASSES_SINGULAR_COUNT = 1;

export const CLASSES_TABLE_COLUMN_COUNT = 7;

export const CLASSES_TABLE_ACTION_ICON_SIZE_PX = 16;

export const CLASSES_TABLE_EMPTY_ICON_SIZE_PX = 48;

export const CLASSES_TABLE_ADD_ICON_SIZE_PX = 16;

export const CLASS_STUDENTS_MIN = 1;

export const CLASS_STUDENTS_MAX = 60;

export const CLASS_LEVEL_LABELS: Record<SchoolClassLevel, string> = {
	infantil: 'Early childhood',
	fundamental_i: 'Elementary I',
	fundamental_ii: 'Elementary II',
	medio: 'High school'
};

export const CLASS_SHIFT_LABELS: Record<SchoolClassShift, string> = {
	manha: 'Morning',
	tarde: 'Afternoon',
	noite: 'Evening',
	integral: 'Full day'
};

export const CLASS_STATUS_LABELS: Record<SchoolClassStatus, string> = {
	active: 'Active',
	inactive: 'Inactive'
};
