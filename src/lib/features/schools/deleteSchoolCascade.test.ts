import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteSchoolCascade } from './deleteSchoolCascade';
import type { SchoolClass } from '$lib/types/SchoolClass';

const { listBySchoolIdMock, removeClassMock, removeSchoolMock } = vi.hoisted(() => {
	return {
		listBySchoolIdMock: vi.fn(),
		removeClassMock: vi.fn(),
		removeSchoolMock: vi.fn()
	};
});

vi.mock('$lib/services/api/classesService', () => {
	return {
		classesService: {
			listBySchoolId: listBySchoolIdMock,
			remove: removeClassMock
		}
	};
});

vi.mock('$lib/services/api/schoolsService', () => {
	return {
		schoolsService: {
			remove: removeSchoolMock
		}
	};
});

const LINKED_CLASSES: SchoolClass[] = [
	{
		id: 'class-1',
		schoolId: 'school-1',
		name: '3° A',
		grade: '3° Ano',
		level: 'fundamental_i',
		teacher: 'Ana',
		students: 28,
		shift: 'manha',
		status: 'active'
	},
	{
		id: 'class-2',
		schoolId: 'school-1',
		name: '4° B',
		grade: '4° Ano',
		level: 'fundamental_i',
		teacher: 'Bruno',
		students: 25,
		shift: 'tarde',
		status: 'active'
	}
];

describe('deleteSchoolCascade', () => {
	beforeEach(() => {
		listBySchoolIdMock.mockReset();
		removeClassMock.mockReset();
		removeSchoolMock.mockReset();
	});

	it('removes linked classes before removing the school', async () => {
		listBySchoolIdMock.mockResolvedValue(LINKED_CLASSES);
		removeClassMock.mockResolvedValue(undefined);
		removeSchoolMock.mockResolvedValue(undefined);

		await deleteSchoolCascade('school-1');

		expect(listBySchoolIdMock).toHaveBeenCalledWith('school-1');
		expect(removeClassMock).toHaveBeenCalledWith('class-1');
		expect(removeClassMock).toHaveBeenCalledWith('class-2');
		expect(removeSchoolMock).toHaveBeenCalledWith('school-1');
	});
});
