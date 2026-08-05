import type {
	SchoolFormFieldErrors,
	SchoolFormValues
} from '$lib/features/schools/schoolFormTypes';

export interface ParseSchoolFormValuesResult {
	isValid: boolean;
	data: SchoolFormValues | null;
	errors: SchoolFormFieldErrors;
}
