export type SchoolClassLevel = 'infantil' | 'fundamental_i' | 'fundamental_ii' | 'medio';

export type SchoolClassShift = 'manha' | 'tarde' | 'noite' | 'integral';

export type SchoolClassStatus = 'active' | 'inactive';

export interface SchoolClass {
	id: string;
	schoolId: string;
	name: string;
	grade: string;
	level: SchoolClassLevel;
	teacher: string;
	students: number;
	shift: SchoolClassShift;
	status: SchoolClassStatus;
}
