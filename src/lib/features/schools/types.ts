import type { SchoolStatus, SchoolType } from '$lib/types/School';

export type SchoolsTypeFilterValue = 'all' | SchoolType;

export type SchoolsStatusFilterValue = 'all' | SchoolStatus;

export interface SchoolsFilterOption<TValue extends string> {
	value: TValue;
	label: string;
}
