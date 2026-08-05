import { CLASS_COUNT_INCREMENT, EMPTY_CLASS_COUNT } from '$lib/features/classes/constants';
import type { ClassCountBySchoolId } from '$lib/features/classes/types';
import type { SchoolClass } from '$lib/types/SchoolClass';

export function buildClassCountBySchoolId(schoolClasses: SchoolClass[]): ClassCountBySchoolId {
	const classCountBySchoolId: ClassCountBySchoolId = {};

	for (const schoolClass of schoolClasses) {
		const currentCount = classCountBySchoolId[schoolClass.schoolId] ?? EMPTY_CLASS_COUNT;

		classCountBySchoolId[schoolClass.schoolId] = currentCount + CLASS_COUNT_INCREMENT;
	}

	return classCountBySchoolId;
}
