import { describe, expect, it } from 'vitest';
import { filterSchools } from '$lib/features/schools/filterSchools';
import { HARDCODED_SCHOOLS } from '$lib/features/schools/hardcodedSchools';
import { SCHOOLS_FILTER_ALL_VALUE } from '$lib/features/schools/constants';

describe('filterSchools', () => {
	it('returns all schools when filters are cleared', () => {
		const filteredSchools = filterSchools({
			schools: HARDCODED_SCHOOLS,
			searchQuery: '',
			typeFilter: SCHOOLS_FILTER_ALL_VALUE,
			statusFilter: SCHOOLS_FILTER_ALL_VALUE
		});

		expect(filteredSchools).toHaveLength(HARDCODED_SCHOOLS.length);
	});

	it('filters by search query against name and neighborhood', () => {
		const filteredSchools = filterSchools({
			schools: HARDCODED_SCHOOLS,
			searchQuery: 'pinheiros',
			typeFilter: SCHOOLS_FILTER_ALL_VALUE,
			statusFilter: SCHOOLS_FILTER_ALL_VALUE
		});

		expect(filteredSchools).toHaveLength(1);
		expect(filteredSchools[0]?.name).toBe('CEFET Santos Dumont');
	});

	it('filters by type and status together', () => {
		const filteredSchools = filterSchools({
			schools: HARDCODED_SCHOOLS,
			searchQuery: '',
			typeFilter: 'estadual',
			statusFilter: 'inactive'
		});

		expect(filteredSchools).toHaveLength(1);
		expect(filteredSchools[0]?.name).toBe('EE Cecília Meireles');
	});
});
