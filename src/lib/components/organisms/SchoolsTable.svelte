<script lang="ts">
	import { Edit2, Eye, MapPin, Plus, School as SchoolIcon, Trash2 } from '@lucide/svelte';
	import { Badge } from '$lib/components/atoms/Badge/index.js';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import * as Table from '$lib/components/atoms/Table/index.js';
	import type { ClassCountBySchoolId } from '$lib/features/classes/types';
	import { EMPTY_CLASS_COUNT } from '$lib/features/classes/constants';
	import {
		SCHOOL_STATUS_LABELS,
		SCHOOL_TYPE_BADGE_VARIANT,
		SCHOOL_TYPE_LABELS,
		SCHOOLS_TABLE_ACTION_ICON_SIZE_PX,
		SCHOOLS_TABLE_COLUMN_COUNT,
		SCHOOLS_TABLE_EMPTY_ICON_SIZE_PX,
		SCHOOLS_TABLE_MAP_PIN_ICON_SIZE_PX
	} from '$lib/features/schools/constants';
	import type {
		SchoolsTableAddHandler,
		SchoolsTableSchoolHandler
	} from '$lib/features/schools/types';
	import type { School } from '$lib/types/School';
	import { cn } from '$lib/utils/cn';

	export interface SchoolsTableProps {
		schools: School[];
		classCountBySchoolId: ClassCountBySchoolId;
		hasActiveFilters: boolean;
		hasSearchQuery: boolean;
		onViewSchool?: SchoolsTableSchoolHandler;
		onEditSchool?: SchoolsTableSchoolHandler;
		onDeleteSchool?: SchoolsTableSchoolHandler;
		onAddSchool?: SchoolsTableAddHandler;
	}

	let {
		schools,
		classCountBySchoolId,
		hasActiveFilters,
		hasSearchQuery,
		onViewSchool,
		onEditSchool,
		onDeleteSchool,
		onAddSchool
	}: SchoolsTableProps = $props();

	const hasSchools = $derived<boolean>(schools.length > 0);

	const isFilteredEmpty = $derived<boolean>(hasActiveFilters || hasSearchQuery);

	const emptyHeading = $derived<string>(
		isFilteredEmpty ? 'No schools found' : 'No schools registered'
	);

	const emptyDescription = $derived<string>(
		isFilteredEmpty
			? 'Try different terms or clear the filters.'
			: 'Start by adding the first school.'
	);

	const shouldShowEmptyAddAction = $derived<boolean>(Boolean(onAddSchool) && !isFilteredEmpty);

	function getClassCount(schoolId: string): number {
		return classCountBySchoolId[schoolId] ?? EMPTY_CLASS_COUNT;
	}

	function handleViewActionClick(school: School): void {
		if (!onViewSchool) {
			return;
		}

		onViewSchool(school);
	}

	function handleEditActionClick(school: School): void {
		if (!onEditSchool) {
			return;
		}

		onEditSchool(school);
	}

	function handleDeleteActionClick(school: School): void {
		if (!onDeleteSchool) {
			return;
		}

		onDeleteSchool(school);
	}
</script>

<div
	class={cn(
		'w-full overflow-hidden',
		'border-border bg-card rounded-md border shadow-(--shadow-sm)'
	)}
>
	<Table.Root class="min-w-[720px]">
		<Table.Header class="bg-navy-50 [&_tr]:border-border [&_tr]:border-b-2">
			<Table.Row class="hover:bg-navy-50">
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Name
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Type
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Address
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Principal
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Classes
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Status
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-end text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if hasSchools}
				{#each schools as school (school.id)}
					{@const classCount = getClassCount(school.id)}
					{@const typeBadgeVariant = SCHOOL_TYPE_BADGE_VARIANT[school.type]}
					{@const statusBadgeVariant = school.status === 'active' ? 'success' : 'danger'}
					<Table.Row
						class={cn(
							'border-border group border-b',
							'transition-colors duration-150 motion-reduce:transition-none'
						)}
					>
						<Table.Cell class="px-4 py-3">
							<span class={cn('font-heading text-navy-800 text-sm font-semibold')}>
								{school.name}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<Badge variant={typeBadgeVariant}>
								{SCHOOL_TYPE_LABELS[school.type]}
							</Badge>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<div class={cn('text-muted-foreground flex items-center gap-1.5')}>
								<MapPin
									size={SCHOOLS_TABLE_MAP_PIN_ICON_SIZE_PX}
									aria-hidden="true"
									class="shrink-0"
								/>
								<span class={cn('font-body text-foreground text-sm')}>
									{school.neighborhood}
								</span>
							</div>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('font-body text-foreground text-sm')}>
								{school.principal}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('text-foreground font-mono text-[0.8125rem] font-medium')}>
								{classCount}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<Badge variant={statusBadgeVariant}>
								{SCHOOL_STATUS_LABELS[school.status]}
							</Badge>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<div
								class={cn(
									'flex justify-end gap-0.5',
									'opacity-40 transition-opacity duration-150 motion-reduce:transition-none',
									'group-focus-within:opacity-100 group-hover:opacity-100'
								)}
							>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="View classes for {school.name}"
									onclick={() => handleViewActionClick(school)}
								>
									<Eye size={SCHOOLS_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Edit {school.name}"
									onclick={() => handleEditActionClick(school)}
								>
									<Edit2 size={SCHOOLS_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Delete {school.name}"
									class="hover:text-danger-600"
									onclick={() => handleDeleteActionClick(school)}
								>
									<Trash2 size={SCHOOLS_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
								</Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			{:else}
				<Table.Row class="hover:bg-transparent">
					<Table.Cell
						colspan={SCHOOLS_TABLE_COLUMN_COUNT}
						class="px-6 py-[60px] text-center whitespace-normal"
					>
						<SchoolIcon
							size={SCHOOLS_TABLE_EMPTY_ICON_SIZE_PX}
							aria-hidden="true"
							class={cn('text-muted-foreground mx-auto mb-4 opacity-50')}
						/>
						<p class={cn('font-heading text-foreground mb-1.5 text-base font-semibold')}>
							{emptyHeading}
						</p>
						<p class={cn('font-body text-muted-foreground mb-5 text-sm')}>
							{emptyDescription}
						</p>
						{#if shouldShowEmptyAddAction && onAddSchool}
							<Button type="button" size="sm" onclick={onAddSchool}>
								<Plus size={SCHOOLS_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
								New school
							</Button>
						{/if}
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</div>
