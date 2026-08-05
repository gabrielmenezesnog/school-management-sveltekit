<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { navigating } from '$app/state';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import SchoolsFilterCard from '$lib/components/molecules/SchoolsFilterCard.svelte';
	import SchoolsTableSkeleton from '$lib/components/molecules/SchoolsTableSkeleton.svelte';
	import TablePagination from '$lib/components/molecules/TablePagination.svelte';
	import SchoolsTable from '$lib/components/organisms/SchoolsTable.svelte';
	import {
		SCHOOLS_FILTER_ALL_VALUE,
		SCHOOLS_SINGULAR_COUNT,
		SCHOOLS_TABLE_ADD_ICON_SIZE_PX,
		SCHOOLS_TABLE_PAGE_SIZE
	} from '$lib/features/schools/constants';
	import { filterSchools } from '$lib/features/schools/filterSchools';
	import type {
		SchoolsStatusFilterValue,
		SchoolsTypeFilterValue
	} from '$lib/features/schools/types';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { PAGINATION_FIRST_PAGE } from '$lib/constants/pagination';
	import { SCHOOLS_ROUTE } from '$lib/constants/routes';
	import type { School } from '$lib/types/School';
	import { cn } from '$lib/utils/cn';
	import { paginateItems } from '$lib/utils/paginateItems';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let searchQuery = $state<string>('');
	let typeFilter = $state<SchoolsTypeFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let statusFilter = $state<SchoolsStatusFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let currentPage = $state<number>(PAGINATION_FIRST_PAGE);

	const isLoadingSchools = $derived<boolean>(
		Boolean(navigating?.to?.url.pathname.startsWith(SCHOOLS_ROUTE))
	);

	const filteredSchools = $derived<School[]>(
		filterSchools({
			schools: data.schools,
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

	const registeredSchoolsLabel = $derived<string>(
		data.schools.length === SCHOOLS_SINGULAR_COUNT
			? '1 school registered'
			: `${data.schools.length} schools registered`
	);

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
			{#if isLoadingSchools}
				Loading schools…
			{:else}
				{registeredSchoolsLabel}
			{/if}
		</p>
	</div>

	<Button type="button" class="w-full shrink-0 sm:w-auto" disabled>
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

	{#if isLoadingSchools}
		<SchoolsTableSkeleton />
	{:else}
		<SchoolsTable
			schools={pagedSchools}
			classCountBySchoolId={data.classCountBySchoolId}
			{hasActiveFilters}
			{hasSearchQuery}
		/>
		<TablePagination
			count={resultCount}
			page={activePage}
			perPage={SCHOOLS_TABLE_PAGE_SIZE}
			onPageChange={handlePageChange}
		/>
	{/if}
</div>
