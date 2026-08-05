<script lang="ts">
	import SchoolsFilterCard from '$lib/components/molecules/SchoolsFilterCard.svelte';
	import SchoolsTableSkeleton from '$lib/components/molecules/SchoolsTableSkeleton.svelte';
	import TablePagination from '$lib/components/molecules/TablePagination.svelte';
	import SchoolsTable from '$lib/components/organisms/SchoolsTable.svelte';
	import {
		SCHOOLS_FILTER_ALL_VALUE,
		SCHOOLS_TABLE_PAGE_SIZE
	} from '$lib/features/schools/constants';
	import { filterSchools } from '$lib/features/schools/filterSchools';
	import type {
		SchoolsStatusFilterValue,
		SchoolsTypeFilterValue
	} from '$lib/features/schools/types';
	import type { ClassCountBySchoolId } from '$lib/features/classes/types';
	import { PAGINATION_FIRST_PAGE } from '$lib/constants/pagination';
	import type { School } from '$lib/types/School';
	import { paginateItems } from '$lib/utils/paginateItems';

	export type SchoolsListSectionSchoolHandler = (school: School) => void;
	export type SchoolsListSectionAddHandler = () => void;

	export interface SchoolsListSectionProps {
		schools: School[];
		classCountBySchoolId: ClassCountBySchoolId;
		isLoading: boolean;
		onViewSchool: SchoolsListSectionSchoolHandler;
		onEditSchool: SchoolsListSectionSchoolHandler;
		onDeleteSchool: SchoolsListSectionSchoolHandler;
		onAddSchool: SchoolsListSectionAddHandler;
	}

	let {
		schools,
		classCountBySchoolId,
		isLoading,
		onViewSchool,
		onEditSchool,
		onDeleteSchool,
		onAddSchool
	}: SchoolsListSectionProps = $props();

	let searchQuery = $state<string>('');
	let typeFilter = $state<SchoolsTypeFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let statusFilter = $state<SchoolsStatusFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let currentPage = $state<number>(PAGINATION_FIRST_PAGE);

	const filteredSchools = $derived<School[]>(
		filterSchools({
			schools,
			searchQuery,
			typeFilter,
			statusFilter
		})
	);

	const resultCount = $derived<number>(filteredSchools.length);

	const pageCount = $derived<number>(
		Math.max(PAGINATION_FIRST_PAGE, Math.ceil(resultCount / SCHOOLS_TABLE_PAGE_SIZE))
	);

	const activePage = $derived<number>(Math.min(currentPage, pageCount));

	const pagedSchools = $derived<School[]>(
		paginateItems({
			items: filteredSchools,
			page: activePage,
			perPage: SCHOOLS_TABLE_PAGE_SIZE
		})
	);

	const hasActiveFilters = $derived<boolean>(
		typeFilter !== SCHOOLS_FILTER_ALL_VALUE || statusFilter !== SCHOOLS_FILTER_ALL_VALUE
	);

	const hasSearchQuery = $derived<boolean>(searchQuery.trim().length > 0);

	function resetCurrentPage(): void {
		currentPage = PAGINATION_FIRST_PAGE;
	}

	function handlePageChange(page: number): void {
		currentPage = page;
	}

	function handleSearchQueryChange(query: string): void {
		searchQuery = query;
		resetCurrentPage();
	}

	function handleTypeFilterChange(type: SchoolsTypeFilterValue): void {
		typeFilter = type;
		resetCurrentPage();
	}

	function handleStatusFilterChange(status: SchoolsStatusFilterValue): void {
		statusFilter = status;
		resetCurrentPage();
	}

	function handleClearFilters(): void {
		typeFilter = SCHOOLS_FILTER_ALL_VALUE;
		statusFilter = SCHOOLS_FILTER_ALL_VALUE;
		resetCurrentPage();
	}
</script>

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

{#if isLoading}
	<SchoolsTableSkeleton />
{:else}
	<SchoolsTable
		schools={pagedSchools}
		{classCountBySchoolId}
		{hasActiveFilters}
		{hasSearchQuery}
		{onViewSchool}
		{onEditSchool}
		{onDeleteSchool}
		{onAddSchool}
	/>
	<TablePagination
		count={resultCount}
		page={activePage}
		perPage={SCHOOLS_TABLE_PAGE_SIZE}
		onPageChange={handlePageChange}
	/>
{/if}
