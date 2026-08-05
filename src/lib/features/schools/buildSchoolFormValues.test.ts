import { describe, expect, it, vi } from 'vitest';
import {
	buildSchoolCreateInput,
	buildSchoolFormValues,
	buildSchoolUpdateInput,
	EMPTY_SCHOOL_FORM_VALUES
} from './buildSchoolFormValues';
import type { School } from '$lib/types/School';

const SAMPLE_SCHOOL: School = {
	id: 'school-1',
	name: 'Lincoln Elementary',
	address: '123 Main St',
	neighborhood: 'Downtown',
	city: 'Springfield',
	phone: '(11) 3211-4500',
	email: 'lincoln@edu.gov',
	principal: 'Jane Doe',
	type: 'municipal',
	status: 'active',
	createdAt: '2012-06-03'
};

describe('buildSchoolFormValues', () => {
	it('maps a school into form values', () => {
		expect(buildSchoolFormValues(SAMPLE_SCHOOL)).toEqual({
			name: 'Lincoln Elementary',
			type: 'municipal',
			address: '123 Main St',
			neighborhood: 'Downtown',
			city: 'Springfield',
			phone: '(11) 3211-4500',
			email: 'lincoln@edu.gov',
			principal: 'Jane Doe',
			status: 'active'
		});
	});
});

describe('buildSchoolCreateInput', () => {
	it('adds a createdAt date to form values', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date('2026-08-05T12:00:00.000Z'));

		const values = {
			...EMPTY_SCHOOL_FORM_VALUES,
			name: 'Lincoln Elementary',
			address: '123 Main St',
			neighborhood: 'Downtown',
			city: 'Springfield',
			principal: 'Jane Doe'
		};

		expect(buildSchoolCreateInput(values)).toEqual({
			...values,
			createdAt: '2026-08-05'
		});

		vi.useRealTimers();
	});
});

describe('buildSchoolUpdateInput', () => {
	it('merges form values onto the existing school', () => {
		const values = {
			...EMPTY_SCHOOL_FORM_VALUES,
			name: 'Lincoln Updated',
			address: '999 Oak Ave',
			neighborhood: 'North',
			city: 'Springfield',
			principal: 'John Smith',
			status: 'inactive' as const
		};

		expect(buildSchoolUpdateInput(SAMPLE_SCHOOL, values)).toEqual({
			...SAMPLE_SCHOOL,
			...values
		});
	});
});
