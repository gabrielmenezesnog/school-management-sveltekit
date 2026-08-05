import { z } from 'zod';
import type { ParseSchoolFormValuesResult } from '$lib/features/schools/parseSchoolFormValuesResult';
import type {
	SchoolFormFieldErrors,
	SchoolFormFieldKey,
	SchoolFormValues
} from '$lib/features/schools/schoolFormTypes';

const SCHOOL_TYPE_VALUES = ['municipal', 'estadual', 'federal'] as const;
const SCHOOL_STATUS_VALUES = ['active', 'inactive'] as const;

function isOptionalEmailValid(email: string): boolean {
	if (!email) {
		return true;
	}

	return z.email().safeParse(email).success;
}

export const schoolFormSchema = z.object({
	name: z.string().trim().min(1, 'School name is required.'),
	type: z.enum(SCHOOL_TYPE_VALUES),
	address: z.string().trim().min(1, 'Address is required.'),
	neighborhood: z.string().trim().min(1, 'Neighborhood is required.'),
	city: z.string().trim().min(1, 'City is required.'),
	phone: z.string(),
	email: z.string().trim().refine(isOptionalEmailValid, {
		message: 'Enter a valid email address.'
	}),
	principal: z.string().trim().min(1, 'Principal name is required.'),
	status: z.enum(SCHOOL_STATUS_VALUES)
});

function isSchoolFormFieldKey(value: string): value is SchoolFormFieldKey {
	return value in EMPTY_ERROR_KEYS;
}

const EMPTY_ERROR_KEYS: Record<SchoolFormFieldKey, true> = {
	name: true,
	type: true,
	address: true,
	neighborhood: true,
	city: true,
	phone: true,
	email: true,
	principal: true,
	status: true
};

export function parseSchoolFormValues(values: SchoolFormValues): ParseSchoolFormValuesResult {
	const result = schoolFormSchema.safeParse(values);

	if (result.success) {
		return {
			isValid: true,
			data: result.data,
			errors: {}
		};
	}

	const errors: SchoolFormFieldErrors = {};

	for (const issue of result.error.issues) {
		const fieldKey = issue.path[0];

		if (typeof fieldKey !== 'string') {
			continue;
		}

		if (!isSchoolFormFieldKey(fieldKey)) {
			continue;
		}

		if (errors[fieldKey]) {
			continue;
		}

		errors[fieldKey] = issue.message;
	}

	return {
		isValid: false,
		data: null,
		errors
	};
}
