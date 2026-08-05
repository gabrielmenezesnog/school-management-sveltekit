<script lang="ts">
	import SchoolsFilterCard from '$lib/components/molecules/SchoolsFilterCard.svelte';
	import {
		HARDCODED_SCHOOLS_RESULT_COUNT,
		SCHOOLS_FILTER_ALL_VALUE
	} from '$lib/features/schools/constants';
	import type {
		SchoolsStatusFilterValue,
		SchoolsTypeFilterValue
	} from '$lib/features/schools/types';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { cn } from '$lib/utils/cn';

	let searchQuery = $state<string>('');
	let typeFilter = $state<SchoolsTypeFilterValue>(SCHOOLS_FILTER_ALL_VALUE);
	let statusFilter = $state<SchoolsStatusFilterValue>(SCHOOLS_FILTER_ALL_VALUE);

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
</script>

<svelte:head>
	<title>{SCHOOLS_NAV_LABEL} — {APP_BRAND_NAME}</title>
</svelte:head>

<h1
	class={cn(
		'font-heading text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]',
		'text-(--foreground)'
	)}
>
	{SCHOOLS_NAV_LABEL}
</h1>
<p class={cn('font-body mt-1.5 text-sm', 'text-(--muted-foreground)')}>
	School registry for the municipal education department.
</p>

<div class="mt-6 w-full sm:mt-8">
	<SchoolsFilterCard
		{searchQuery}
		{typeFilter}
		{statusFilter}
		resultCount={HARDCODED_SCHOOLS_RESULT_COUNT}
		onSearchQueryChange={handleSearchQueryChange}
		onTypeFilterChange={handleTypeFilterChange}
		onStatusFilterChange={handleStatusFilterChange}
		onClearFilters={handleClearFilters}
	/>
</div>
