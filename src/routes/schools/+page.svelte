<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { navigating } from '$app/state';
	import ConfirmDialog from '$lib/components/molecules/ConfirmDialog.svelte';
	import EmptyState from '$lib/components/molecules/EmptyState.svelte';
	import SchoolsPageHeader from '$lib/components/molecules/SchoolsPageHeader.svelte';
	import SchoolForm from '$lib/components/organisms/SchoolForm.svelte';
	import SchoolsListSection from '$lib/components/organisms/SchoolsListSection.svelte';
	import { EMPTY_CLASS_COUNT } from '$lib/features/classes/constants';
	import { SCHOOLS_SINGULAR_COUNT } from '$lib/features/schools/constants';
	import {
		buildSchoolCreateInput,
		buildSchoolFormValues,
		buildSchoolUpdateInput,
		EMPTY_SCHOOL_FORM_VALUES
	} from '$lib/features/schools/buildSchoolFormValues';
	import { buildSchoolDeleteDescription } from '$lib/features/schools/buildSchoolDeleteDescription';
	import { deleteSchoolCascade } from '$lib/features/schools/deleteSchoolCascade';
	import type { SchoolFormValues } from '$lib/features/schools/schoolFormTypes';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { SCHOOLS_ROUTE } from '$lib/constants/routes';
	import { schoolsService } from '$lib/services/api/schoolsService';
	import type { School } from '$lib/types/School';
	import { getClientErrorMessage } from '$lib/utils/getClientErrorMessage';
	import { showErrorToast, showSuccessToast } from '$lib/utils/toast';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isRetryingApi = $state<boolean>(false);
	let isSchoolFormOpen = $state<boolean>(false);
	let schoolBeingEdited = $state<School | null>(null);
	let schoolFormSessionId = $state<number>(0);
	let isSavingSchool = $state<boolean>(false);
	let isDeleteDialogOpen = $state<boolean>(false);
	let schoolPendingDelete = $state<School | null>(null);
	let isDeletingSchool = $state<boolean>(false);

	const isLoadingSchools = $derived<boolean>(
		Boolean(navigating?.to?.url.pathname.startsWith(SCHOOLS_ROUTE))
	);

	const isApiUnavailable = $derived<boolean>(Boolean(data.apiUnavailableMessage));

	const isEditingSchool = $derived<boolean>(Boolean(schoolBeingEdited));

	const registeredSchoolsLabel = $derived<string>(
		data.schools.length === SCHOOLS_SINGULAR_COUNT
			? '1 school registered'
			: `${data.schools.length} schools registered`
	);

	const schoolsStatusLabel = $derived.by((): string => {
		if (isLoadingSchools) {
			return 'Loading schools…';
		}

		if (isApiUnavailable) {
			return 'API unavailable';
		}

		return registeredSchoolsLabel;
	});

	const schoolFormInitialValues = $derived<SchoolFormValues>(
		schoolBeingEdited ? buildSchoolFormValues(schoolBeingEdited) : { ...EMPTY_SCHOOL_FORM_VALUES }
	);

	const deleteDialogTitle = $derived<string>(
		schoolPendingDelete ? `Delete "${schoolPendingDelete.name}"?` : 'Delete school?'
	);

	const deleteDialogDescription = $derived<string>(
		schoolPendingDelete
			? buildSchoolDeleteDescription({
					schoolName: schoolPendingDelete.name,
					classCount: data.classCountBySchoolId[schoolPendingDelete.id] ?? EMPTY_CLASS_COUNT
				})
			: ''
	);

	async function handleRetryApiLoad(): Promise<void> {
		isRetryingApi = true;

		try {
			await invalidateAll();
		} finally {
			isRetryingApi = false;
		}
	}

	function handleAddSchool(): void {
		schoolBeingEdited = null;
		schoolFormSessionId += 1;
		isSchoolFormOpen = true;
	}

	function handleEditSchool(school: School): void {
		schoolBeingEdited = school;
		schoolFormSessionId += 1;
		isSchoolFormOpen = true;
	}

	function handleCloseSchoolForm(): void {
		if (isSavingSchool) {
			return;
		}

		isSchoolFormOpen = false;
		schoolBeingEdited = null;
	}

	function handleViewSchool(school: School): void {
		void goto(resolve('/schools/[id]', { id: school.id }));
	}

	function handleDeleteSchool(school: School): void {
		schoolPendingDelete = school;
		isDeleteDialogOpen = true;
	}

	function handleCancelDeleteSchool(): void {
		if (isDeletingSchool) {
			return;
		}

		isDeleteDialogOpen = false;
		schoolPendingDelete = null;
	}

	async function handleSubmitSchool(values: SchoolFormValues): Promise<void> {
		isSavingSchool = true;

		try {
			if (schoolBeingEdited) {
				await schoolsService.update(
					schoolBeingEdited.id,
					buildSchoolUpdateInput(schoolBeingEdited, values)
				);
				showSuccessToast(`${values.name} updated successfully.`);
			} else {
				await schoolsService.create(buildSchoolCreateInput(values));
				showSuccessToast(`${values.name} created successfully.`);
			}

			isSchoolFormOpen = false;
			schoolBeingEdited = null;
			await invalidateAll();
		} catch (submitError) {
			if (submitError instanceof Error) {
				showErrorToast(getClientErrorMessage(submitError, 'Failed to save school.'));
				return;
			}

			showErrorToast('Failed to save school.');
		} finally {
			isSavingSchool = false;
		}
	}

	async function handleConfirmDeleteSchool(): Promise<void> {
		if (!schoolPendingDelete) {
			return;
		}

		const schoolName = schoolPendingDelete.name;
		const schoolId = schoolPendingDelete.id;

		isDeletingSchool = true;

		try {
			await deleteSchoolCascade(schoolId);
			showSuccessToast(`${schoolName} deleted successfully.`);
			isDeleteDialogOpen = false;
			schoolPendingDelete = null;
			await invalidateAll();
		} catch (deleteError) {
			if (deleteError instanceof Error) {
				showErrorToast(getClientErrorMessage(deleteError, `Failed to delete ${schoolName}.`));
				return;
			}

			showErrorToast(`Failed to delete ${schoolName}.`);
		} finally {
			isDeletingSchool = false;
		}
	}
</script>

<svelte:head>
	<title>{SCHOOLS_NAV_LABEL} — {APP_BRAND_NAME}</title>
</svelte:head>

<SchoolsPageHeader
	statusLabel={schoolsStatusLabel}
	isAddDisabled={isApiUnavailable}
	onAddSchool={handleAddSchool}
/>

<div class="mt-6 w-full sm:mt-8">
	{#if isApiUnavailable && data.apiUnavailableMessage}
		<EmptyState
			heading="API unavailable"
			description={data.apiUnavailableMessage}
			actionLabel="Try again"
			isActionPending={isRetryingApi}
			onAction={handleRetryApiLoad}
		/>
	{:else}
		<SchoolsListSection
			schools={data.schools}
			classCountBySchoolId={data.classCountBySchoolId}
			isLoading={isLoadingSchools}
			onViewSchool={handleViewSchool}
			onEditSchool={handleEditSchool}
			onDeleteSchool={handleDeleteSchool}
			onAddSchool={handleAddSchool}
		/>
	{/if}
</div>

{#key schoolFormSessionId}
	<SchoolForm
		bind:open={isSchoolFormOpen}
		initialValues={schoolFormInitialValues}
		isEditing={isEditingSchool}
		isSaving={isSavingSchool}
		onSubmit={handleSubmitSchool}
		onClose={handleCloseSchoolForm}
	/>
{/key}

<ConfirmDialog
	bind:open={isDeleteDialogOpen}
	title={deleteDialogTitle}
	description={deleteDialogDescription}
	confirmLabel="Delete"
	isConfirming={isDeletingSchool}
	onConfirm={handleConfirmDeleteSchool}
	onCancel={handleCancelDeleteSchool}
/>
