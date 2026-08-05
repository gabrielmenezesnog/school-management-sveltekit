import { describe, expect, it } from 'vitest';
import {
	buildClassCreateInput,
	buildClassFormValues,
	buildClassUpdateInput,
	EMPTY_CLASS_FORM_VALUES
} from './buildClassFormValues';
import type { SchoolClass } from '$lib/types/SchoolClass';

const SAMPLE_CLASS: SchoolClass = {
	id: 'class-1',
	schoolId: 'school-1',
	name: '1st A',
	grade: '1st year',
	level: 'fundamental_i',
	teacher: 'Maria Silva',
	students: 28,
	shift: 'manha',
	status: 'active'
};

describe('buildClassFormValues', () => {
	it('maps a class into form values', () => {
		expect(buildClassFormValues(SAMPLE_CLASS)).toEqual({
			name: '1st A',
			grade: '1st year',
			level: 'fundamental_i',
			teacher: 'Maria Silva',
			students: 28,
			shift: 'manha',
			status: 'active'
		});
	});
});

describe('buildClassCreateInput', () => {
	it('attaches the school id to form values', () => {
		const values = {
			...EMPTY_CLASS_FORM_VALUES,
			name: '1st A',
			grade: '1st year',
			teacher: 'Maria Silva',
			students: 28
		};

		expect(buildClassCreateInput('school-1', values)).toEqual({
			schoolId: 'school-1',
			...values
		});
	});
});

describe('buildClassUpdateInput', () => {
	it('merges form values onto the existing class', () => {
		const values = {
			...EMPTY_CLASS_FORM_VALUES,
			name: '1st B',
			grade: '1st year',
			teacher: 'João Souza',
			students: 30,
			status: 'inactive' as const
		};

		expect(buildClassUpdateInput(SAMPLE_CLASS, values)).toEqual({
			...SAMPLE_CLASS,
			...values
		});
	});
});
