import type { SchoolStatus, SchoolType } from '$lib/types/School';

export interface SchoolFormValues {
	name: string;
	type: SchoolType;
	address: string;
	neighborhood: string;
	city: string;
	phone: string;
	email: string;
	principal: string;
	status: SchoolStatus;
}

export type SchoolFormFieldKey = keyof SchoolFormValues;

export type SchoolFormFieldErrors = Partial<Record<SchoolFormFieldKey, string>>;

export type SchoolFormSubmitHandler = (values: SchoolFormValues) => void | Promise<void>;

export type SchoolFormCloseHandler = () => void;
