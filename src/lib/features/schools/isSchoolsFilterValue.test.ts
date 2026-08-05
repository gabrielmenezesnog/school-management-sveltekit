import { describe, expect, it } from 'vitest';
import {
	isSchoolsStatusFilterValue,
	isSchoolsTypeFilterValue
} from '$lib/features/schools/isSchoolsFilterValue';

describe('isSchoolsTypeFilterValue', () => {
	it('accepts known type filter values', () => {
		expect(isSchoolsTypeFilterValue('all')).toBe(true);
		expect(isSchoolsTypeFilterValue('municipal')).toBe(true);
		expect(isSchoolsTypeFilterValue('estadual')).toBe(true);
		expect(isSchoolsTypeFilterValue('federal')).toBe(true);
	});

	it('rejects unknown type filter values', () => {
		expect(isSchoolsTypeFilterValue('private')).toBe(false);
		expect(isSchoolsTypeFilterValue('')).toBe(false);
	});
});

describe('isSchoolsStatusFilterValue', () => {
	it('accepts known status filter values', () => {
		expect(isSchoolsStatusFilterValue('all')).toBe(true);
		expect(isSchoolsStatusFilterValue('active')).toBe(true);
		expect(isSchoolsStatusFilterValue('inactive')).toBe(true);
	});

	it('rejects unknown status filter values', () => {
		expect(isSchoolsStatusFilterValue('pending')).toBe(false);
		expect(isSchoolsStatusFilterValue('')).toBe(false);
	});
});
