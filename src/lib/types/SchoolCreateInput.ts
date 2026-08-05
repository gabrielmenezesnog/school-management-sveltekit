import type { School } from '$lib/types/School';

export type SchoolCreateInput = Omit<School, 'id'>;
