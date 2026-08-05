import { describe, expect, it } from 'vitest';
import { EMPTY_CLASS_FORM_VALUES } from './buildClassFormValues';
import { parseClassFormValues } from './classFormSchema';
import type { ClassFormValues } from './classFormTypes';
import { CLASS_STUDENTS_MAX } from './constants';

describe('parseClassFormValues', () => {
	it('accepts a complete valid form', () => {
		const values: ClassFormValues = {
			...EMPTY_CLASS_FORM_VALUES,
			name: '1st A',
			grade: '1st year',
			teacher: 'Maria Silva',
			students: 28
		};

		const result = parseClassFormValues(values);

		expect(result.isValid).toBe(true);
		expect(result.data?.name).toBe('1st A');
		expect(result.errors).toEqual({});
	});

	it('rejects missing required fields', () => {
		const result = parseClassFormValues({
			...EMPTY_CLASS_FORM_VALUES,
			name: '',
			grade: '',
			teacher: ''
		});

		expect(result.isValid).toBe(false);
		expect(result.errors.name).toBe('Class name is required.');
		expect(result.errors.grade).toBe('Grade is required.');
		expect(result.errors.teacher).toBe('Teacher name is required.');
	});

	it('rejects students outside the allowed range', () => {
		const values: ClassFormValues = {
			...EMPTY_CLASS_FORM_VALUES,
			name: '1st A',
			grade: '1st year',
			teacher: 'Maria Silva',
			students: CLASS_STUDENTS_MAX + 1
		};

		const result = parseClassFormValues(values);

		expect(result.isValid).toBe(false);
		expect(result.errors.students).toBe('Enter between 1 and 60 students.');
	});
});
