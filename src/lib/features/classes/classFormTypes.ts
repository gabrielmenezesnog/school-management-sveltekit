import type { SchoolClassLevel, SchoolClassShift, SchoolClassStatus } from '$lib/types/SchoolClass';

export interface ClassFormValues {
	name: string;
	grade: string;
	level: SchoolClassLevel;
	teacher: string;
	students: number;
	shift: SchoolClassShift;
	status: SchoolClassStatus;
}

export type ClassFormFieldKey = keyof ClassFormValues;

export type ClassFormFieldErrors = Partial<Record<ClassFormFieldKey, string>>;

export type ClassFormSubmitHandler = (values: ClassFormValues) => void | Promise<void>;

export type ClassFormCloseHandler = () => void;
