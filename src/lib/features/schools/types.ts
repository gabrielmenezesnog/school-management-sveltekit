import type { School, SchoolStatus, SchoolType } from '$lib/types/School';

export type SchoolsTypeFilterValue = 'all' | SchoolType;

export type SchoolsStatusFilterValue = 'all' | SchoolStatus;

export interface SchoolsFilterOption<TValue extends string> {
	value: TValue;
	label: string;
}

export type SchoolsTableSchoolHandler = (school: School) => void;

export type SchoolsTableAddHandler = () => void;
