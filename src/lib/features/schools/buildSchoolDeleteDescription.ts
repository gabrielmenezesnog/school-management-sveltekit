import { CLASSES_SINGULAR_COUNT, EMPTY_CLASS_COUNT } from '$lib/features/classes/constants';

export interface BuildSchoolDeleteDescriptionInput {
	schoolName: string;
	classCount: number;
}

export function buildSchoolDeleteDescription({
	schoolName,
	classCount
}: BuildSchoolDeleteDescriptionInput): string {
	const hasLinkedClasses = classCount > EMPTY_CLASS_COUNT;

	if (!hasLinkedClasses) {
		return `This will permanently remove ${schoolName}. This action cannot be undone.`;
	}

	const classesLabel =
		classCount === CLASSES_SINGULAR_COUNT ? '1 linked class' : `${classCount} linked classes`;

	return `This will permanently remove ${schoolName} and all ${classesLabel}. This action cannot be undone.`;
}
