import {
	SCHOOL_STATUS_FILTER_OPTIONS,
	SCHOOL_TYPE_FILTER_OPTIONS
} from '$lib/features/schools/constants';
import type { SchoolsStatusFilterValue, SchoolsTypeFilterValue } from '$lib/features/schools/types';

export function isSchoolsTypeFilterValue(value: string): value is SchoolsTypeFilterValue {
	return SCHOOL_TYPE_FILTER_OPTIONS.some(function matchesTypeOption(option): boolean {
		return option.value === value;
	});
}

export function isSchoolsStatusFilterValue(value: string): value is SchoolsStatusFilterValue {
	return SCHOOL_STATUS_FILTER_OPTIONS.some(function matchesStatusOption(option): boolean {
		return option.value === value;
	});
}
