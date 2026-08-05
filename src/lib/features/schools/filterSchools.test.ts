import { describe, expect, it } from 'vitest';
import { filterSchools } from '$lib/features/schools/filterSchools';
import { SCHOOLS_FILTER_ALL_VALUE } from '$lib/features/schools/constants';
import type { School } from '$lib/types/School';

const SAMPLE_SCHOOLS: School[] = [
	{
		id: 'school-1',
		name: 'EMEF João XXIII',
		address: 'Rua das Flores, 234',
		neighborhood: 'Centro',
		city: 'São Paulo',
		phone: '(11) 3211-4500',
		email: 'joaoxxiii@edu.sp.gov.br',
		principal: 'Maria Aparecida Silva',
		type: 'municipal',
		status: 'active',
		createdAt: '2018-03-12'
	},
	{
		id: 'school-5',
		name: 'CEFET Santos Dumont',
		address: 'Av. Brigadeiro Faria Lima, 2300',
		neighborhood: 'Pinheiros',
		city: 'São Paulo',
		phone: '(11) 3816-2500',
		email: 'santosdumont@cefet.gov.br',
		principal: 'Fernanda Costa Marques',
		type: 'federal',
		status: 'active',
		createdAt: '2008-11-20'
	},
	{
		id: 'school-6',
		name: 'EE Cecília Meireles',
		address: 'Rua Vergueiro, 4120',
		neighborhood: 'Vila Mariana',
		city: 'São Paulo',
		phone: '(11) 5084-3300',
		email: 'ceciliame@educacao.sp.gov.br',
		principal: 'Luísa Fernandes Torres',
		type: 'estadual',
		status: 'inactive',
		createdAt: '2014-04-08'
	}
];

describe('filterSchools', () => {
	it('returns all schools when filters are cleared', () => {
		const filteredSchools = filterSchools({
			schools: SAMPLE_SCHOOLS,
			searchQuery: '',
			typeFilter: SCHOOLS_FILTER_ALL_VALUE,
			statusFilter: SCHOOLS_FILTER_ALL_VALUE
		});

		expect(filteredSchools).toHaveLength(SAMPLE_SCHOOLS.length);
	});

	it('filters by search query against name and neighborhood', () => {
		const filteredSchools = filterSchools({
			schools: SAMPLE_SCHOOLS,
			searchQuery: 'pinheiros',
			typeFilter: SCHOOLS_FILTER_ALL_VALUE,
			statusFilter: SCHOOLS_FILTER_ALL_VALUE
		});

		expect(filteredSchools).toHaveLength(1);
		expect(filteredSchools[0]?.name).toBe('CEFET Santos Dumont');
	});

	it('filters by type and status together', () => {
		const filteredSchools = filterSchools({
			schools: SAMPLE_SCHOOLS,
			searchQuery: '',
			typeFilter: 'estadual',
			statusFilter: 'inactive'
		});

		expect(filteredSchools).toHaveLength(1);
		expect(filteredSchools[0]?.name).toBe('EE Cecília Meireles');
	});
});
