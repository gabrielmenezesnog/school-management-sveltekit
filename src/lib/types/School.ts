export type SchoolType = 'municipal' | 'estadual' | 'federal';

export type SchoolStatus = 'active' | 'inactive';

export interface School {
	id: string;
	name: string;
	address: string;
	neighborhood: string;
	city: string;
	phone: string;
	email: string;
	principal: string;
	type: SchoolType;
	status: SchoolStatus;
	createdAt: string;
}
