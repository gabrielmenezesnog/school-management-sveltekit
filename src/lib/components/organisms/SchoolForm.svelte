<script lang="ts">
	import { Loader2 } from '@lucide/svelte';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import * as Dialog from '$lib/components/atoms/Dialog/index.js';
	import { Input } from '$lib/components/atoms/Input/index.js';
	import * as Select from '$lib/components/atoms/Select/index.js';
	import FormField from '$lib/components/molecules/FormField.svelte';
	import { SCHOOL_STATUS_LABELS, SCHOOL_TYPE_LABELS } from '$lib/features/schools/constants';
	import { schoolFormSchema } from '$lib/features/schools/schoolFormSchema';
	import type {
		SchoolFormCloseHandler,
		SchoolFormSubmitHandler,
		SchoolFormValues
	} from '$lib/features/schools/schoolFormTypes';
	import type { SchoolStatus, SchoolType } from '$lib/types/School';
	import { cn } from '$lib/utils/cn';
	import { untrack } from 'svelte';
	import {
		defaults,
		superForm,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';

	export interface SchoolFormProps {
		open: boolean;
		initialValues: SchoolFormValues;
		isEditing: boolean;
		isSaving?: boolean;
		onSubmit: SchoolFormSubmitHandler;
		onClose: SchoolFormCloseHandler;
	}

	interface SchoolFormUpdatePayload {
		form: SuperValidated<Infer<typeof schoolFormSchema>>;
	}

	const SCHOOL_TYPE_OPTIONS: SchoolType[] = ['municipal', 'estadual', 'federal'];
	const SCHOOL_STATUS_OPTIONS: SchoolStatus[] = ['active', 'inactive'];

	let {
		open = $bindable(false),
		initialValues,
		isEditing,
		isSaving = false,
		onSubmit,
		onClose
	}: SchoolFormProps = $props();

	const dialogTitle = $derived<string>(isEditing ? 'Edit school' : 'New school');
	const submitLabel = $derived<string>(isEditing ? 'Save changes' : 'Create school');

	async function handleFormUpdate({ form }: SchoolFormUpdatePayload): Promise<void> {
		if (!form.valid) {
			return;
		}

		await onSubmit(form.data);
	}

	const formApi = superForm(
		untrack(() => defaults(initialValues, zod4(schoolFormSchema))),
		{
			id: 'school-form',
			SPA: true,
			validators: zod4(schoolFormSchema),
			dataType: 'json',
			resetForm: false,
			invalidateAll: false,
			applyAction: false,
			onUpdate: handleFormUpdate
		}
	);

	const { form, errors, enhance, submitting } = formApi;

	const selectedTypeLabel = $derived<string>(SCHOOL_TYPE_LABELS[$form.type]);
	const selectedStatusLabel = $derived<string>(SCHOOL_STATUS_LABELS[$form.status]);
	const isFormBusy = $derived<boolean>(isSaving || $submitting);

	function isSchoolType(value: string): value is SchoolType {
		return SCHOOL_TYPE_OPTIONS.some(function matchesType(option): boolean {
			return option === value;
		});
	}

	function isSchoolStatus(value: string): value is SchoolStatus {
		return SCHOOL_STATUS_OPTIONS.some(function matchesStatus(option): boolean {
			return option === value;
		});
	}

	function handleTypeChange(nextValue: string): void {
		if (!isSchoolType(nextValue)) {
			return;
		}

		$form.type = nextValue;
	}

	function handleStatusChange(nextValue: string): void {
		if (!isSchoolStatus(nextValue)) {
			return;
		}

		$form.status = nextValue;
	}

	function handleOpenChange(isOpen: boolean): void {
		if (isOpen || isFormBusy) {
			return;
		}

		onClose();
	}

	function getFieldErrorMessage(fieldErrors: string[] | undefined): string {
		if (!fieldErrors?.[0]) {
			return '';
		}

		return fieldErrors[0];
	}

	function getFieldErrorId(fieldId: string, hasError: boolean): string | undefined {
		if (!hasError) {
			return undefined;
		}

		return `${fieldId}-error`;
	}

	const selectTriggerClassName = cn(
		'h-9 w-full min-w-0 rounded-md border shadow-xs',
		'font-body bg-background',
		'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
	);
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content
		showCloseButton={!isFormBusy}
		class={cn('max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-xl')}
	>
		<Dialog.Header
			class={cn('border-border bg-card sticky top-0 z-10', 'border-b px-6 py-5 text-start sm:px-7')}
		>
			<Dialog.Title class="font-heading text-lg font-semibold">{dialogTitle}</Dialog.Title>
			<Dialog.Description class="sr-only">
				Enter school details and save to {isEditing ? 'update' : 'create'} the school.
			</Dialog.Description>
		</Dialog.Header>

		<form class="px-6 py-6 sm:px-7 sm:pb-7" method="POST" novalidate use:enhance>
			<div class="grid gap-4.5">
				<FormField
					id="school-name"
					label="School name"
					isRequired
					errorMessage={getFieldErrorMessage($errors.name)}
				>
					<Input
						id="school-name"
						name="name"
						type="text"
						bind:value={$form.name}
						placeholder="e.g. Lincoln Elementary"
						aria-invalid={Boolean($errors.name)}
						aria-required="true"
						aria-describedby={getFieldErrorId('school-name', Boolean($errors.name))}
						disabled={isFormBusy}
					/>
				</FormField>

				<div class="grid gap-4 sm:grid-cols-2">
					<FormField id="school-type" label="School type" isRequired>
						<Select.Root
							type="single"
							value={$form.type}
							disabled={isFormBusy}
							onValueChange={handleTypeChange}
						>
							<Select.Trigger id="school-type" aria-required="true" class={selectTriggerClassName}>
								{selectedTypeLabel}
							</Select.Trigger>
							<Select.Content>
								{#each SCHOOL_TYPE_OPTIONS as typeOption (typeOption)}
									<Select.Item value={typeOption} label={SCHOOL_TYPE_LABELS[typeOption]}>
										{SCHOOL_TYPE_LABELS[typeOption]}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</FormField>

					<FormField id="school-status" label="Status">
						<Select.Root
							type="single"
							value={$form.status}
							disabled={isFormBusy}
							onValueChange={handleStatusChange}
						>
							<Select.Trigger id="school-status" class={selectTriggerClassName}>
								{selectedStatusLabel}
							</Select.Trigger>
							<Select.Content>
								{#each SCHOOL_STATUS_OPTIONS as statusOption (statusOption)}
									<Select.Item value={statusOption} label={SCHOOL_STATUS_LABELS[statusOption]}>
										{SCHOOL_STATUS_LABELS[statusOption]}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</FormField>
				</div>

				<FormField
					id="school-address"
					label="Address"
					isRequired
					errorMessage={getFieldErrorMessage($errors.address)}
				>
					<Input
						id="school-address"
						name="address"
						type="text"
						bind:value={$form.address}
						placeholder="Street and number"
						aria-invalid={Boolean($errors.address)}
						aria-required="true"
						aria-describedby={getFieldErrorId('school-address', Boolean($errors.address))}
						disabled={isFormBusy}
					/>
				</FormField>

				<div class="grid gap-4 sm:grid-cols-2">
					<FormField
						id="school-neighborhood"
						label="Neighborhood"
						isRequired
						errorMessage={getFieldErrorMessage($errors.neighborhood)}
					>
						<Input
							id="school-neighborhood"
							name="neighborhood"
							type="text"
							bind:value={$form.neighborhood}
							placeholder="Neighborhood"
							aria-invalid={Boolean($errors.neighborhood)}
							aria-required="true"
							aria-describedby={getFieldErrorId(
								'school-neighborhood',
								Boolean($errors.neighborhood)
							)}
							disabled={isFormBusy}
						/>
					</FormField>

					<FormField
						id="school-city"
						label="City"
						isRequired
						errorMessage={getFieldErrorMessage($errors.city)}
					>
						<Input
							id="school-city"
							name="city"
							type="text"
							bind:value={$form.city}
							placeholder="City"
							aria-invalid={Boolean($errors.city)}
							aria-required="true"
							aria-describedby={getFieldErrorId('school-city', Boolean($errors.city))}
							disabled={isFormBusy}
						/>
					</FormField>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<FormField id="school-phone" label="Phone">
						<Input
							id="school-phone"
							name="phone"
							type="tel"
							bind:value={$form.phone}
							placeholder="(00) 0000-0000"
							disabled={isFormBusy}
						/>
					</FormField>

					<FormField
						id="school-email"
						label="Email"
						errorMessage={getFieldErrorMessage($errors.email)}
					>
						<Input
							id="school-email"
							name="email"
							type="email"
							bind:value={$form.email}
							placeholder="school@edu.gov.br"
							aria-invalid={Boolean($errors.email)}
							aria-describedby={getFieldErrorId('school-email', Boolean($errors.email))}
							disabled={isFormBusy}
						/>
					</FormField>
				</div>

				<FormField
					id="school-principal"
					label="Principal"
					isRequired
					errorMessage={getFieldErrorMessage($errors.principal)}
				>
					<Input
						id="school-principal"
						name="principal"
						type="text"
						bind:value={$form.principal}
						placeholder="Full name of the principal"
						aria-invalid={Boolean($errors.principal)}
						aria-required="true"
						aria-describedby={getFieldErrorId('school-principal', Boolean($errors.principal))}
						disabled={isFormBusy}
					/>
				</FormField>
			</div>

			<Dialog.Footer
				class={cn('border-border mt-7 gap-2.5 border-t pt-5', 'sm:flex-row sm:justify-end')}
			>
				<Button type="button" variant="secondary" disabled={isFormBusy} onclick={onClose}>
					Cancel
				</Button>
				<Button type="submit" class="min-w-28" disabled={isFormBusy}>
					{#if isFormBusy}
						<Loader2 class="size-4 animate-spin" aria-hidden="true" />
						Saving…
					{:else}
						{submitLabel}
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
