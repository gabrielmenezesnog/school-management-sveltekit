import { describe, expect, it } from 'vitest';
import { buildClassCountBySchoolId } from '$lib/features/classes/buildClassCountBySchoolId';
import type { SchoolClass } from '$lib/types/SchoolClass';

const SAMPLE_CLASSES: SchoolClass[] = [
	{
		id: 'c-1',
		schoolId: 'school-1',
		name: '1° A',
		grade: '1° Ano',
		level: 'fundamental_i',
		teacher: 'Ana',
		students: 20,
		shift: 'manha',
		status: 'active'
	},
	{
		id: 'c-2',
		schoolId: 'school-1',
		name: '1° B',
		grade: '1° Ano',
		level: 'fundamental_i',
		teacher: 'Bruno',
		students: 22,
		shift: 'tarde',
		status: 'active'
	},
	{
		id: 'c-3',
		schoolId: 'school-2',
		name: '2° A',
		grade: '2° Ano',
		level: 'fundamental_i',
		teacher: 'Carla',
		students: 18,
		shift: 'manha',
		status: 'active'
	}
];

describe('buildClassCountBySchoolId', () => {
	it('counts classes grouped by school id', () => {
		const classCountBySchoolId = buildClassCountBySchoolId(SAMPLE_CLASSES);

		expect(classCountBySchoolId['school-1']).toBe(2);
		expect(classCountBySchoolId['school-2']).toBe(1);
	});
});
