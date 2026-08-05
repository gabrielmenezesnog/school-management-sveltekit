import type { ClassFormFieldErrors, ClassFormValues } from '$lib/features/classes/classFormTypes';

export interface ParseClassFormValuesResult {
	isValid: boolean;
	data: ClassFormValues | null;
	errors: ClassFormFieldErrors;
}
