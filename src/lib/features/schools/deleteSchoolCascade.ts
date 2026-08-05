import { classesService } from '$lib/services/api/classesService';
import { schoolsService } from '$lib/services/api/schoolsService';
import type { SchoolClass } from '$lib/types/SchoolClass';

async function removeSchoolClass(schoolClass: SchoolClass): Promise<void> {
	await classesService.remove(schoolClass.id);
}

export async function deleteSchoolCascade(schoolId: string): Promise<void> {
	const linkedClasses = await classesService.listBySchoolId(schoolId);

	await Promise.all(linkedClasses.map(removeSchoolClass));
	await schoolsService.remove(schoolId);
}
