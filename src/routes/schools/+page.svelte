<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import SchoolsFilterCard from '$lib/components/molecules/SchoolsFilterCard.svelte';
	import SchoolsTable from '$lib/components/organisms/SchoolsTable.svelte';
	import {
		SCHOOLS_FILTER_ALL_VALUE,
		SCHOOLS_TABLE_ADD_ICON_SIZE_PX
	} from '$lib/features/schools/constants';
	import { filterSchools } from '$lib/features/schools/filterSchools';
	import {
		HARDCODED_CLASS_COUNT_BY_SCHOOL_ID,
		HARDCODED_SCHOOLS
	} from '$lib/features/schools/hardcodedSchools';
	import type {
		SchoolsStatusFilterValue,
		SchoolsTypeFilterValue
	} from '$lib/features/schools/types';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import type { School } from '$lib/types/School';
	import { cn } from '$lib/utils/cn';

	let searchQuery = $state<string>('');
	let typeFilter = $state<SchoolsTypeFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let statusFilter = $state<SchoolsStatusFilterValue>(SCHOOLS_FILTER_ALL_VALUE);

	const filteredSchools = $derived<School[]>(
		filterSchools({
			schools: HARDCODED_SCHOOLS,
			searchQuery,
			typeFilter,
			statusFilter
		})
	);

	const resultCount = $derived<number>(filteredSchools.length);

	const hasActiveFilters = $derived<boolean>(
		typeFilter !== SCHOOLS_FILTER_ALL_VALUE || statusFilter !== SCHOOLS_FILTER_ALL_VALUE
	);

	const hasSearchQuery = $derived<boolean>(searchQuery.trim().length > 0);

	const registeredSchoolsLabel = $derived<string>(
		HARDCODED_SCHOOLS.length === 1
			? '1 school registered'
			: `${HARDCODED_SCHOOLS.length} schools registered`
	);

	function handleSearchQueryChange(query: string): void {
		searchQuery = query;
	}

	function handleTypeFilterChange(type: SchoolsTypeFilterValue): void {
		typeFilter = type;
	}

	function handleStatusFilterChange(status: SchoolsStatusFilterValue): void {
		statusFilter = status;
	}

	function handleClearFilters(): void {
		typeFilter = SCHOOLS_FILTER_ALL_VALUE;
		statusFilter = SCHOOLS_FILTER_ALL_VALUE;
	}

	function handleViewSchool(school: School): void {
		void school.id;
	}

	function handleEditSchool(school: School): void {
		void school.id;
	}

	function handleDeleteSchool(school: School): void {
		void school.id;
	}

	function handleAddSchool(): void {
		void HARDCODED_SCHOOLS.length;
	}
</script>

<svelte:head>
	<title>{SCHOOLS_NAV_LABEL} — {APP_BRAND_NAME}</title>
</svelte:head>

<div class={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4')}>
	<div class="min-w-0">
		<h1
			class={cn(
				'font-heading text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]',
				'text-(--foreground)'
			)}
		>
			{SCHOOLS_NAV_LABEL}
		</h1>
		<p class={cn('font-body mt-1.5 text-sm', 'text-(--muted-foreground)')}>
			{registeredSchoolsLabel}
		</p>
	</div>

	<Button type="button" class="w-full shrink-0 sm:w-auto" onclick={handleAddSchool}>
		<Plus size={SCHOOLS_TABLE_ADD_ICON_SIZE_PX} aria-hidden="true" />
		New school
	</Button>
</div>

<div class="mt-6 w-full sm:mt-8">
	<SchoolsFilterCard
		{searchQuery}
		{typeFilter}
		{statusFilter}
		{resultCount}
		onSearchQueryChange={handleSearchQueryChange}
		onTypeFilterChange={handleTypeFilterChange}
		onStatusFilterChange={handleStatusFilterChange}
		onClearFilters={handleClearFilters}
	/>

	<SchoolsTable
		schools={filteredSchools}
		classCountBySchoolId={HARDCODED_CLASS_COUNT_BY_SCHOOL_ID}
		{hasActiveFilters}
		{hasSearchQuery}
		onViewSchool={handleViewSchool}
		onEditSchool={handleEditSchool}
		onDeleteSchool={handleDeleteSchool}
		onAddSchool={handleAddSchool}
	/>
</div>
