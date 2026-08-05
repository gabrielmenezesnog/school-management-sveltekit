import { describe, expect, it } from 'vitest';
import { isSchoolsSectionPath } from './isSchoolsSectionPath';

describe('isSchoolsSectionPath', () => {
	it('returns true for the schools list path', (): void => {
		expect(isSchoolsSectionPath('/schools')).toBe(true);
	});

	it('returns true for nested school paths', (): void => {
		expect(isSchoolsSectionPath('/schools/1')).toBe(true);
		expect(isSchoolsSectionPath('/schools/1/edit')).toBe(true);
	});

	it('returns false for unrelated paths', (): void => {
		expect(isSchoolsSectionPath('/')).toBe(false);
		expect(isSchoolsSectionPath('/classes/1')).toBe(false);
	});
});
