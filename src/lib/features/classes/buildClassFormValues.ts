import type { ClassFormValues } from '$lib/features/classes/classFormTypes';
import type { SchoolClass } from '$lib/types/SchoolClass';
import type { SchoolClassCreateInput } from '$lib/types/SchoolClassCreateInput';
import type { SchoolClassUpdateInput } from '$lib/types/SchoolClassUpdateInput';

export const EMPTY_CLASS_FORM_VALUES: ClassFormValues = {
	name: '',
	grade: '',
	level: 'fundamental_i',
	teacher: '',
	students: 1,
	shift: 'manha',
	status: 'active'
};

export function buildClassFormValues(schoolClass: SchoolClass): ClassFormValues {
	return {
		name: schoolClass.name,
		grade: schoolClass.grade,
		level: schoolClass.level,
		teacher: schoolClass.teacher,
		students: schoolClass.students,
		shift: schoolClass.shift,
		status: schoolClass.status
	};
}

export function buildClassCreateInput(
	schoolId: string,
	values: ClassFormValues
): SchoolClassCreateInput {
	return {
		schoolId,
		...values
	};
}

export function buildClassUpdateInput(
	schoolClass: SchoolClass,
	values: ClassFormValues
): SchoolClassUpdateInput {
	return {
		...schoolClass,
		...values
	};
}
