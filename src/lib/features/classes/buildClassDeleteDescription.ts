export interface BuildClassDeleteDescriptionInput {
	className: string;
	schoolName: string;
}

export function buildClassDeleteDescription({
	className,
	schoolName
}: BuildClassDeleteDescriptionInput): string {
	return `This will permanently remove ${className} from ${schoolName}.`;
}
