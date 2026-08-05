import type { SchoolClass } from '$lib/types/SchoolClass';

export type SchoolClassCreateInput = Omit<SchoolClass, 'id'>;
