<script lang="ts">
	import { ChevronRight, Plus } from '@lucide/svelte';
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import ConfirmDialog from '$lib/components/molecules/ConfirmDialog.svelte';
	import SchoolCard from '$lib/components/molecules/SchoolCard.svelte';
	import ClassForm from '$lib/components/organisms/ClassForm.svelte';
	import ClassesTable from '$lib/components/organisms/ClassesTable.svelte';
	import { buildClassDeleteDescription } from '$lib/features/classes/buildClassDeleteDescription';
	import {
		buildClassCreateInput,
		buildClassFormValues,
		buildClassUpdateInput,
		EMPTY_CLASS_FORM_VALUES
	} from '$lib/features/classes/buildClassFormValues';
	import { CLASSES_SINGULAR_COUNT } from '$lib/features/classes/constants';
	import type { ClassFormValues } from '$lib/features/classes/classFormTypes';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { SCHOOLS_ROUTE } from '$lib/constants/routes';
	import { classesService } from '$lib/services/api/classesService';
	import type { SchoolClass } from '$lib/types/SchoolClass';
	import { getClientErrorMessage } from '$lib/utils/getClientErrorMessage';
	import { showErrorToast, showSuccessToast } from '$lib/utils/toast';
	import { cn } from '$lib/utils/cn';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isClassFormOpen = $state<boolean>(false);
	let classBeingEdited = $state<SchoolClass | null>(null);
	let classFormSessionId = $state<number>(0);
	let isSavingClass = $state<boolean>(false);
	let isDeleteDialogOpen = $state<boolean>(false);
	let classPendingDelete = $state<SchoolClass | null>(null);
	let isDeletingClass = $state<boolean>(false);

	const schoolsHref = resolve(SCHOOLS_ROUTE);
	const classesHeadingId = 'school-classes-heading';

	const isEditingClass = $derived<boolean>(Boolean(classBeingEdited));

	const classesCountLabel = $derived<string>(
		data.schoolClasses.length === CLASSES_SINGULAR_COUNT
			? '1 class'
			: `${data.schoolClasses.length} classes`
	);

	const classFormInitialValues = $derived<ClassFormValues>(
		classBeingEdited ? buildClassFormValues(classBeingEdited) : { ...EMPTY_CLASS_FORM_VALUES }
	);

	const deleteDialogTitle = $derived<string>(
		classPendingDelete ? `Delete "${classPendingDelete.name}"?` : 'Delete class?'
	);

	const deleteDialogDescription = $derived<string>(
		classPendingDelete
			? buildClassDeleteDescription({
					className: classPendingDelete.name,
					schoolName: data.school.name
				})
			: ''
	);

	function handleAddClass(): void {
		classBeingEdited = null;
		classFormSessionId += 1;
		isClassFormOpen = true;
	}

	function handleEditClass(schoolClass: SchoolClass): void {
		classBeingEdited = schoolClass;
		classFormSessionId += 1;
		isClassFormOpen = true;
	}

	function handleCloseClassForm(): void {
		if (isSavingClass) {
			return;
		}

		isClassFormOpen = false;
		classBeingEdited = null;
	}

	function handleDeleteClass(schoolClass: SchoolClass): void {
		classPendingDelete = schoolClass;
		isDeleteDialogOpen = true;
	}

	function handleCancelDeleteClass(): void {
		if (isDeletingClass) {
			return;
		}

		isDeleteDialogOpen = false;
		classPendingDelete = null;
	}

	async function handleSubmitClass(values: ClassFormValues): Promise<void> {
		isSavingClass = true;

		try {
			if (classBeingEdited) {
				await classesService.update(
					classBeingEdited.id,
					buildClassUpdateInput(classBeingEdited, values)
				);
				showSuccessToast(`${values.name} updated successfully.`);
			} else {
				await classesService.create(buildClassCreateInput(data.school.id, values));
				showSuccessToast(`${values.name} created successfully.`);
			}

			isClassFormOpen = false;
			classBeingEdited = null;
			await invalidateAll();
		} catch (submitError) {
			if (submitError instanceof Error) {
				showErrorToast(getClientErrorMessage(submitError, 'Failed to save class.'));
				return;
			}

			showErrorToast('Failed to save class.');
		} finally {
			isSavingClass = false;
		}
	}

	async function handleConfirmDeleteClass(): Promise<void> {
		if (!classPendingDelete) {
			return;
		}

		const className = classPendingDelete.name;
		const classId = classPendingDelete.id;

		isDeletingClass = true;

		try {
			await classesService.remove(classId);
			showSuccessToast(`${className} deleted successfully.`);
			isDeleteDialogOpen = false;
			classPendingDelete = null;
			await invalidateAll();
		} catch (deleteError) {
			if (deleteError instanceof Error) {
				showErrorToast(getClientErrorMessage(deleteError, `Failed to delete ${className}.`));
				return;
			}

			showErrorToast(`Failed to delete ${className}.`);
		} finally {
			isDeletingClass = false;
		}
	}
</script>

<svelte:head>
	<title>{data.school.name} — {APP_BRAND_NAME}</title>
</svelte:head>

<nav class={cn('mb-5 flex min-w-0 flex-wrap items-center gap-1.5')} aria-label="Breadcrumb">
	<a
		href={schoolsHref}
		class={cn(
			'font-heading text-muted-foreground hover:text-foreground text-sm font-medium',
			'transition-colors duration-150 motion-reduce:transition-none'
		)}
	>
		{SCHOOLS_NAV_LABEL}
	</a>
	<ChevronRight class="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
	<span class={cn('font-heading text-foreground truncate text-sm font-semibold')}>
		{data.school.name}
	</span>
</nav>

<SchoolCard school={data.school} />

<section class="mt-8" aria-labelledby={classesHeadingId}>
	<div class="mb-4 flex min-w-0 flex-wrap items-end justify-between gap-3">
		<div class="min-w-0">
			<h2
				id={classesHeadingId}
				class={cn('font-heading text-foreground text-lg font-semibold tracking-[-0.01em]')}
			>
				Classes
			</h2>
			<p class={cn('font-body text-muted-foreground mt-1 text-sm')}>
				{classesCountLabel}
			</p>
		</div>

		<Button type="button" size="sm" class="shrink-0" onclick={handleAddClass}>
			<Plus class="size-4" aria-hidden="true" />
			New class
		</Button>
	</div>

	<div class="w-full overflow-x-auto">
		<ClassesTable
			schoolClasses={data.schoolClasses}
			onEditClass={handleEditClass}
			onDeleteClass={handleDeleteClass}
			onAddClass={handleAddClass}
		/>
	</div>
</section>

{#key classFormSessionId}
	<ClassForm
		bind:open={isClassFormOpen}
		schoolName={data.school.name}
		initialValues={classFormInitialValues}
		isEditing={isEditingClass}
		isSaving={isSavingClass}
		onSubmit={handleSubmitClass}
		onClose={handleCloseClassForm}
	/>
{/key}

<ConfirmDialog
	bind:open={isDeleteDialogOpen}
	title={deleteDialogTitle}
	description={deleteDialogDescription}
	confirmLabel="Delete"
	isConfirming={isDeletingClass}
	onConfirm={handleConfirmDeleteClass}
	onCancel={handleCancelDeleteClass}
/>
