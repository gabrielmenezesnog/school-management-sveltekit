import { describe, expect, it } from 'vitest';
import { EMPTY_SCHOOL_FORM_VALUES } from './buildSchoolFormValues';
import { parseSchoolFormValues } from './schoolFormSchema';
import type { SchoolFormValues } from './schoolFormTypes';

describe('parseSchoolFormValues', () => {
	it('accepts a complete valid form', () => {
		const values: SchoolFormValues = {
			...EMPTY_SCHOOL_FORM_VALUES,
			name: 'Lincoln Elementary',
			address: '123 Main St',
			neighborhood: 'Downtown',
			city: 'Springfield',
			principal: 'Jane Doe',
			email: 'lincoln@edu.gov'
		};

		const result = parseSchoolFormValues(values);

		expect(result.isValid).toBe(true);
		expect(result.data?.name).toBe('Lincoln Elementary');
		expect(result.errors).toEqual({});
	});

	it('rejects missing required fields', () => {
		const result = parseSchoolFormValues({ ...EMPTY_SCHOOL_FORM_VALUES });

		expect(result.isValid).toBe(false);
		expect(result.errors.name).toBe('School name is required.');
		expect(result.errors.address).toBe('Address is required.');
		expect(result.errors.neighborhood).toBe('Neighborhood is required.');
		expect(result.errors.city).toBe('City is required.');
		expect(result.errors.principal).toBe('Principal name is required.');
	});

	it('rejects an invalid email when provided', () => {
		const values: SchoolFormValues = {
			...EMPTY_SCHOOL_FORM_VALUES,
			name: 'Lincoln Elementary',
			address: '123 Main St',
			neighborhood: 'Downtown',
			city: 'Springfield',
			principal: 'Jane Doe',
			email: 'not-an-email'
		};

		const result = parseSchoolFormValues(values);

		expect(result.isValid).toBe(false);
		expect(result.errors.email).toBe('Enter a valid email address.');
	});
});
