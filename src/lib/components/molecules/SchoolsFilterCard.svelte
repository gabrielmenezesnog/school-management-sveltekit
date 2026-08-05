<script lang="ts">
	import SearchBar from '$lib/components/molecules/SearchBar.svelte';
	import { Label } from '$lib/components/atoms/Label/index.js';
	import * as Select from '$lib/components/atoms/Select/index.js';
	import { Separator } from '$lib/components/atoms/Separator/index.js';
	import {
		SCHOOL_STATUS_FILTER_OPTIONS,
		SCHOOL_TYPE_FILTER_OPTIONS,
		SCHOOLS_FILTER_ALL_VALUE
	} from '$lib/features/schools/constants';
	import {
		isSchoolsStatusFilterValue,
		isSchoolsTypeFilterValue
	} from '$lib/features/schools/isSchoolsFilterValue';
	import type {
		SchoolsStatusFilterValue,
		SchoolsTypeFilterValue
	} from '$lib/features/schools/types';
	import { cn } from '$lib/utils/cn';

	export interface SchoolsFilterCardProps {
		searchQuery: string;
		typeFilter: SchoolsTypeFilterValue;
		statusFilter: SchoolsStatusFilterValue;
		resultCount: number;
		onSearchQueryChange: (query: string) => void;
		onTypeFilterChange: (type: SchoolsTypeFilterValue) => void;
		onStatusFilterChange: (status: SchoolsStatusFilterValue) => void;
		onClearFilters: () => void;
	}

	let {
		searchQuery,
		typeFilter,
		statusFilter,
		resultCount,
		onSearchQueryChange,
		onTypeFilterChange,
		onStatusFilterChange,
		onClearFilters
	}: SchoolsFilterCardProps = $props();

	const filterFieldsId = $props.id();

	const activeFilterCount = $derived<number>(
		(typeFilter !== SCHOOLS_FILTER_ALL_VALUE ? 1 : 0) +
			(statusFilter !== SCHOOLS_FILTER_ALL_VALUE ? 1 : 0)
	);

	const hasActiveFilters = $derived<boolean>(activeFilterCount > 0);

	const resultCountLabel = $derived<string>(
		resultCount === 1 ? '1 result' : `${resultCount} results`
	);

	const typeFilterLabel = $derived<string>(
		SCHOOL_TYPE_FILTER_OPTIONS.find(function findTypeLabel(option): boolean {
			return option.value === typeFilter;
		})?.label ?? 'All'
	);

	const statusFilterLabel = $derived<string>(
		SCHOOL_STATUS_FILTER_OPTIONS.find(function findStatusLabel(option): boolean {
			return option.value === statusFilter;
		})?.label ?? 'All'
	);

	function handleTypeFilterChange(nextValue: string): void {
		if (!isSchoolsTypeFilterValue(nextValue)) {
			return;
		}

		onTypeFilterChange(nextValue);
	}

	function handleStatusFilterChange(nextValue: string): void {
		if (!isSchoolsStatusFilterValue(nextValue)) {
			return;
		}

		onStatusFilterChange(nextValue);
	}
</script>

<section
	aria-label="School filters"
	class={cn(
		'mb-5 flex w-full flex-col gap-4 p-4',
		'md:flex-row md:flex-wrap md:items-center md:gap-3 md:px-5',
		'border-border bg-card rounded-md border shadow-(--shadow-sm)'
	)}
>
	<div class="w-full min-w-0 md:min-w-72 md:flex-1">
		<SearchBar
			value={searchQuery}
			placeholder="Search by name, principal, neighborhood…"
			onValueChange={onSearchQueryChange}
		/>
	</div>

	<Separator orientation="vertical" class="hidden h-7! md:block" />

	<div class="grid w-full grid-cols-1 gap-3 md:flex md:w-auto md:items-center md:gap-2">
		<div class="flex min-w-0 flex-col gap-1.5 md:flex-row md:items-center md:gap-2">
			<Label
				id="schools-type-filter-label-{filterFieldsId}"
				class={cn(
					'font-body text-xs font-medium',
					'text-muted-foreground',
					'md:shrink-0 md:whitespace-nowrap'
				)}
			>
				Type
			</Label>
			<div class="w-full min-w-0 md:w-auto">
				<Select.Root type="single" value={typeFilter} onValueChange={handleTypeFilterChange}>
					<Select.Trigger
						id="schools-type-filter-{filterFieldsId}"
						aria-labelledby="schools-type-filter-label-{filterFieldsId}"
						class={cn(
							'font-body bg-card h-9 w-full min-w-0 rounded border-[1.5px] shadow-none md:w-[130px]',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
						)}
					>
						{typeFilterLabel}
					</Select.Trigger>
					<Select.Content>
						{#each SCHOOL_TYPE_FILTER_OPTIONS as option (option.value)}
							<Select.Item value={option.value} label={option.label}>
								{option.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<div class="flex min-w-0 flex-col gap-1.5 md:flex-row md:items-center md:gap-2">
			<Label
				id="schools-status-filter-label-{filterFieldsId}"
				class={cn(
					'font-body text-xs font-medium',
					'text-muted-foreground',
					'md:shrink-0 md:whitespace-nowrap'
				)}
			>
				Status
			</Label>
			<div class="w-full min-w-0 md:w-auto">
				<Select.Root type="single" value={statusFilter} onValueChange={handleStatusFilterChange}>
					<Select.Trigger
						id="schools-status-filter-{filterFieldsId}"
						aria-labelledby="schools-status-filter-label-{filterFieldsId}"
						class={cn(
							'font-body bg-card h-9 w-full min-w-0 rounded border-[1.5px] shadow-none md:w-[120px]',
							'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
						)}
					>
						{statusFilterLabel}
					</Select.Trigger>
					<Select.Content>
						{#each SCHOOL_STATUS_FILTER_OPTIONS as option (option.value)}
							<Select.Item value={option.value} label={option.label}>
								{option.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</div>

	<div
		class={cn(
			'flex w-full items-center gap-3',
			'md:ml-auto md:w-auto md:justify-end'
		)}
	>
		{#if hasActiveFilters}
			<button
				type="button"
				onclick={onClearFilters}
				class={cn(
					'h-8 shrink-0 rounded px-2.5',
					'font-body text-[0.8125rem] text-indigo-500',
					'transition-colors duration-200 motion-reduce:transition-none',
					'hover:bg-indigo-50',
					'focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2'
				)}
			>
				Clear filters ({activeFilterCount})
			</button>
		{/if}

		<span class={cn('font-body text-[0.8125rem]', 'text-muted-foreground', 'ms-auto md:ms-0')}>
			{resultCountLabel}
		</span>
	</div>
</section>
