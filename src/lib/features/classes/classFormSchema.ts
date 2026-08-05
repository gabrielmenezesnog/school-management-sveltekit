import type {
	ClassFormFieldErrors,
	ClassFormFieldKey,
	ClassFormValues
} from '$lib/features/classes/classFormTypes';
import { CLASS_STUDENTS_MAX, CLASS_STUDENTS_MIN } from '$lib/features/classes/constants';
import type { ParseClassFormValuesResult } from '$lib/features/classes/parseClassFormValuesResult';
import { z } from 'zod';

const CLASS_LEVEL_VALUES = ['infantil', 'fundamental_i', 'fundamental_ii', 'medio'] as const;
const CLASS_SHIFT_VALUES = ['manha', 'tarde', 'noite', 'integral'] as const;
const CLASS_STATUS_VALUES = ['active', 'inactive'] as const;

const EMPTY_ERROR_KEYS: Record<ClassFormFieldKey, true> = {
	name: true,
	grade: true,
	level: true,
	teacher: true,
	students: true,
	shift: true,
	status: true
};

function isClassFormFieldKey(value: string): value is ClassFormFieldKey {
	return value in EMPTY_ERROR_KEYS;
}

export const classFormSchema = z.object({
	name: z.string().trim().min(1, 'Class name is required.'),
	grade: z.string().trim().min(1, 'Grade is required.'),
	level: z.enum(CLASS_LEVEL_VALUES),
	teacher: z.string().trim().min(1, 'Teacher name is required.'),
	students: z.coerce
		.number()
		.int('Enter a whole number of students.')
		.min(
			CLASS_STUDENTS_MIN,
			`Enter between ${CLASS_STUDENTS_MIN} and ${CLASS_STUDENTS_MAX} students.`
		)
		.max(
			CLASS_STUDENTS_MAX,
			`Enter between ${CLASS_STUDENTS_MIN} and ${CLASS_STUDENTS_MAX} students.`
		),
	shift: z.enum(CLASS_SHIFT_VALUES),
	status: z.enum(CLASS_STATUS_VALUES)
});

export function parseClassFormValues(values: ClassFormValues): ParseClassFormValuesResult {
	const result = classFormSchema.safeParse(values);

	if (result.success) {
		return {
			isValid: true,
			data: result.data,
			errors: {}
		};
	}

	const errors: ClassFormFieldErrors = {};

	for (const issue of result.error.issues) {
		const fieldKey = issue.path[0];

		if (typeof fieldKey !== 'string') {
			continue;
		}

		if (!isClassFormFieldKey(fieldKey)) {
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
