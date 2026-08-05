import type { SchoolFormValues } from '$lib/features/schools/schoolFormTypes';
import type { School } from '$lib/types/School';
import type { SchoolCreateInput } from '$lib/types/SchoolCreateInput';
import type { SchoolUpdateInput } from '$lib/types/SchoolUpdateInput';

const SCHOOL_CREATED_AT_DATE_LENGTH = 10;

export const EMPTY_SCHOOL_FORM_VALUES: SchoolFormValues = {
	name: '',
	type: 'municipal',
	address: '',
	neighborhood: '',
	city: '',
	phone: '',
	email: '',
	principal: '',
	status: 'active'
};

export function buildSchoolFormValues(school: School): SchoolFormValues {
	return {
		name: school.name,
		type: school.type,
		address: school.address,
		neighborhood: school.neighborhood,
		city: school.city,
		phone: school.phone,
		email: school.email,
		principal: school.principal,
		status: school.status
	};
}

export function buildSchoolCreateInput(values: SchoolFormValues): SchoolCreateInput {
	return {
		...values,
		createdAt: new Date().toISOString().slice(0, SCHOOL_CREATED_AT_DATE_LENGTH)
	};
}

export function buildSchoolUpdateInput(
	school: School,
	values: SchoolFormValues
): SchoolUpdateInput {
	return {
		...school,
		...values
	};
}
