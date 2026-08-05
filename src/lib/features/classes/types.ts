import type { SchoolClass } from '$lib/types/SchoolClass';

export type ClassCountBySchoolId = Record<string, number>;

export type ClassesTableClassHandler = (schoolClass: SchoolClass) => void;

export type ClassesTableAddHandler = () => void;
