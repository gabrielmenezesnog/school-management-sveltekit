<script lang="ts">
	import { BookOpen, Edit2, Plus, Trash2 } from '@lucide/svelte';
	import { Badge } from '$lib/components/atoms/Badge/index.js';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import * as Table from '$lib/components/atoms/Table/index.js';
	import {
		CLASS_LEVEL_LABELS,
		CLASS_SHIFT_LABELS,
		CLASS_STATUS_LABELS,
		CLASSES_TABLE_ACTION_ICON_SIZE_PX,
		CLASSES_TABLE_ADD_ICON_SIZE_PX,
		CLASSES_TABLE_COLUMN_COUNT,
		CLASSES_TABLE_EMPTY_ICON_SIZE_PX
	} from '$lib/features/classes/constants';
	import type {
		ClassesTableAddHandler,
		ClassesTableClassHandler
	} from '$lib/features/classes/types';
	import type { SchoolClass } from '$lib/types/SchoolClass';
	import { cn } from '$lib/utils/cn';

	export interface ClassesTableProps {
		schoolClasses: SchoolClass[];
		onEditClass?: ClassesTableClassHandler;
		onDeleteClass?: ClassesTableClassHandler;
		onAddClass?: ClassesTableAddHandler;
	}

	let { schoolClasses, onEditClass, onDeleteClass, onAddClass }: ClassesTableProps = $props();

	const hasClasses = $derived<boolean>(schoolClasses.length > 0);
	const shouldShowEmptyAddAction = $derived<boolean>(Boolean(onAddClass));

	function handleEditActionClick(schoolClass: SchoolClass): void {
		if (!onEditClass) {
			return;
		}

		onEditClass(schoolClass);
	}

	function handleDeleteActionClick(schoolClass: SchoolClass): void {
		if (!onDeleteClass) {
			return;
		}

		onDeleteClass(schoolClass);
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
					Class
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Level
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Teacher
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Students
				</Table.Head>
				<Table.Head
					class={cn(
						'font-body text-muted-foreground h-auto px-4 py-2.5 text-xs font-medium tracking-[0.06em] uppercase'
					)}
				>
					Shift
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
			{#if hasClasses}
				{#each schoolClasses as schoolClass (schoolClass.id)}
					{@const statusBadgeVariant = schoolClass.status === 'active' ? 'success' : 'danger'}
					<Table.Row class={cn('border-border group border-b')}>
						<Table.Cell class="px-4 py-3">
							<div class="min-w-0">
								<p class={cn('font-heading text-navy-800 text-sm font-semibold')}>
									{schoolClass.name}
								</p>
								<p class={cn('font-body text-muted-foreground text-xs')}>
									{schoolClass.grade}
								</p>
							</div>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('font-body text-foreground text-sm')}>
								{CLASS_LEVEL_LABELS[schoolClass.level]}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('font-body text-foreground text-sm')}>
								{schoolClass.teacher}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('text-foreground font-mono text-[0.8125rem] font-medium')}>
								{schoolClass.students}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<span class={cn('font-body text-foreground text-sm')}>
								{CLASS_SHIFT_LABELS[schoolClass.shift]}
							</span>
						</Table.Cell>
						<Table.Cell class="px-4 py-3">
							<Badge variant={statusBadgeVariant}>
								{CLASS_STATUS_LABELS[schoolClass.status]}
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
								{#if onEditClass}
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										aria-label="Edit {schoolClass.name}"
										onclick={() => handleEditActionClick(schoolClass)}
									>
										<Edit2 size={CLASSES_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
									</Button>
								{/if}
								{#if onDeleteClass}
									<Button
										type="button"
										variant="ghost"
										size="icon-sm"
										aria-label="Delete {schoolClass.name}"
										class="hover:text-danger-600"
										onclick={() => handleDeleteActionClick(schoolClass)}
									>
										<Trash2 size={CLASSES_TABLE_ACTION_ICON_SIZE_PX} aria-hidden="true" />
									</Button>
								{/if}
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			{:else}
				<Table.Row class="hover:bg-transparent">
					<Table.Cell
						colspan={CLASSES_TABLE_COLUMN_COUNT}
						class="px-6 py-[60px] text-center whitespace-normal"
					>
						<BookOpen
							size={CLASSES_TABLE_EMPTY_ICON_SIZE_PX}
							aria-hidden="true"
							class={cn('text-muted-foreground mx-auto mb-4 opacity-50')}
						/>
						<p class={cn('font-heading text-foreground mb-1.5 text-base font-semibold')}>
							No classes registered
						</p>
						<p class={cn('font-body text-muted-foreground mb-5 text-sm')}>
							Start by adding the first class for this school.
						</p>
						{#if shouldShowEmptyAddAction && onAddClass}
							<Button type="button" size="sm" onclick={onAddClass}>
								<Plus size={CLASSES_TABLE_ADD_ICON_SIZE_PX} aria-hidden="true" />
								New class
							</Button>
						{/if}
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</div>
