<script lang="ts">
	import { Loader2 } from '@lucide/svelte';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import * as Dialog from '$lib/components/atoms/Dialog/index.js';
	import { Input } from '$lib/components/atoms/Input/index.js';
	import * as Select from '$lib/components/atoms/Select/index.js';
	import FormField from '$lib/components/molecules/FormField.svelte';
	import {
		CLASS_LEVEL_LABELS,
		CLASS_SHIFT_LABELS,
		CLASS_STATUS_LABELS,
		CLASS_STUDENTS_MAX,
		CLASS_STUDENTS_MIN
	} from '$lib/features/classes/constants';
	import { classFormSchema } from '$lib/features/classes/classFormSchema';
	import type {
		ClassFormCloseHandler,
		ClassFormSubmitHandler,
		ClassFormValues
	} from '$lib/features/classes/classFormTypes';
	import type {
		SchoolClassLevel,
		SchoolClassShift,
		SchoolClassStatus
	} from '$lib/types/SchoolClass';
	import { cn } from '$lib/utils/cn';
	import { untrack } from 'svelte';
	import {
		defaults,
		superForm,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms/client';
	import { zod4 } from 'sveltekit-superforms/adapters';

	export interface ClassFormProps {
		open: boolean;
		schoolName: string;
		initialValues: ClassFormValues;
		isEditing: boolean;
		isSaving?: boolean;
		onSubmit: ClassFormSubmitHandler;
		onClose: ClassFormCloseHandler;
	}

	interface ClassFormUpdatePayload {
		form: SuperValidated<Infer<typeof classFormSchema>>;
	}

	const CLASS_LEVEL_OPTIONS: SchoolClassLevel[] = [
		'infantil',
		'fundamental_i',
		'fundamental_ii',
		'medio'
	];
	const CLASS_SHIFT_OPTIONS: SchoolClassShift[] = ['manha', 'tarde', 'noite', 'integral'];
	const CLASS_STATUS_OPTIONS: SchoolClassStatus[] = ['active', 'inactive'];

	let {
		open = $bindable(false),
		schoolName,
		initialValues,
		isEditing,
		isSaving = false,
		onSubmit,
		onClose
	}: ClassFormProps = $props();

	const dialogTitle = $derived<string>(isEditing ? 'Edit class' : 'New class');
	const submitLabel = $derived<string>(isEditing ? 'Save changes' : 'Create class');

	async function handleFormUpdate({ form }: ClassFormUpdatePayload): Promise<void> {
		if (!form.valid) {
			return;
		}

		await onSubmit(form.data);
	}

	const formApi = superForm(
		untrack(() => defaults(initialValues, zod4(classFormSchema))),
		{
			id: 'class-form',
			SPA: true,
			validators: zod4(classFormSchema),
			dataType: 'json',
			resetForm: false,
			invalidateAll: false,
			applyAction: false,
			onUpdate: handleFormUpdate
		}
	);

	const { form, errors, enhance, submitting } = formApi;

	const selectedLevelLabel = $derived<string>(CLASS_LEVEL_LABELS[$form.level]);
	const selectedShiftLabel = $derived<string>(CLASS_SHIFT_LABELS[$form.shift]);
	const selectedStatusLabel = $derived<string>(CLASS_STATUS_LABELS[$form.status]);
	const isFormBusy = $derived<boolean>(isSaving || $submitting);

	function isSchoolClassLevel(value: string): value is SchoolClassLevel {
		return CLASS_LEVEL_OPTIONS.some(function matchesLevel(option): boolean {
			return option === value;
		});
	}

	function isSchoolClassShift(value: string): value is SchoolClassShift {
		return CLASS_SHIFT_OPTIONS.some(function matchesShift(option): boolean {
			return option === value;
		});
	}

	function isSchoolClassStatus(value: string): value is SchoolClassStatus {
		return CLASS_STATUS_OPTIONS.some(function matchesStatus(option): boolean {
			return option === value;
		});
	}

	function handleLevelChange(nextValue: string): void {
		if (!isSchoolClassLevel(nextValue)) {
			return;
		}

		$form.level = nextValue;
	}

	function handleShiftChange(nextValue: string): void {
		if (!isSchoolClassShift(nextValue)) {
			return;
		}

		$form.shift = nextValue;
	}

	function handleStatusChange(nextValue: string): void {
		if (!isSchoolClassStatus(nextValue)) {
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
			<Dialog.Description class={cn('font-body text-muted-foreground text-sm')}>
				{schoolName}
			</Dialog.Description>
		</Dialog.Header>

		<form class="px-6 py-6 sm:px-7 sm:pb-7" method="POST" novalidate use:enhance>
			<div class="grid gap-4.5">
				<div class="grid gap-4 sm:grid-cols-2">
					<FormField
						id="class-name"
						label="Class name"
						isRequired
						errorMessage={getFieldErrorMessage($errors.name)}
					>
						<Input
							id="class-name"
							name="name"
							type="text"
							bind:value={$form.name}
							placeholder="e.g. 1st A"
							aria-invalid={Boolean($errors.name)}
							aria-required="true"
							aria-describedby={getFieldErrorId('class-name', Boolean($errors.name))}
							disabled={isFormBusy}
						/>
					</FormField>

					<FormField
						id="class-grade"
						label="Grade"
						isRequired
						errorMessage={getFieldErrorMessage($errors.grade)}
					>
						<Input
							id="class-grade"
							name="grade"
							type="text"
							bind:value={$form.grade}
							placeholder="e.g. 1st year"
							aria-invalid={Boolean($errors.grade)}
							aria-required="true"
							aria-describedby={getFieldErrorId('class-grade', Boolean($errors.grade))}
							disabled={isFormBusy}
						/>
					</FormField>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<FormField id="class-level" label="Education level" isRequired>
						<Select.Root
							type="single"
							value={$form.level}
							disabled={isFormBusy}
							onValueChange={handleLevelChange}
						>
							<Select.Trigger id="class-level" class={selectTriggerClassName}>
								{selectedLevelLabel}
							</Select.Trigger>
							<Select.Content>
								{#each CLASS_LEVEL_OPTIONS as levelOption (levelOption)}
									<Select.Item value={levelOption} label={CLASS_LEVEL_LABELS[levelOption]}>
										{CLASS_LEVEL_LABELS[levelOption]}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</FormField>

					<FormField id="class-shift" label="Shift" isRequired>
						<Select.Root
							type="single"
							value={$form.shift}
							disabled={isFormBusy}
							onValueChange={handleShiftChange}
						>
							<Select.Trigger id="class-shift" class={selectTriggerClassName}>
								{selectedShiftLabel}
							</Select.Trigger>
							<Select.Content>
								{#each CLASS_SHIFT_OPTIONS as shiftOption (shiftOption)}
									<Select.Item value={shiftOption} label={CLASS_SHIFT_LABELS[shiftOption]}>
										{CLASS_SHIFT_LABELS[shiftOption]}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</FormField>
				</div>

				<FormField
					id="class-teacher"
					label="Teacher"
					isRequired
					errorMessage={getFieldErrorMessage($errors.teacher)}
				>
					<Input
						id="class-teacher"
						name="teacher"
						type="text"
						bind:value={$form.teacher}
						placeholder="Full name"
						aria-invalid={Boolean($errors.teacher)}
						aria-required="true"
						aria-describedby={getFieldErrorId('class-teacher', Boolean($errors.teacher))}
						disabled={isFormBusy}
					/>
				</FormField>

				<div class="grid gap-4 sm:grid-cols-2">
					<FormField
						id="class-students"
						label="Students"
						isRequired
						errorMessage={getFieldErrorMessage($errors.students)}
					>
						<Input
							id="class-students"
							name="students"
							type="number"
							min={CLASS_STUDENTS_MIN}
							max={CLASS_STUDENTS_MAX}
							bind:value={$form.students}
							placeholder="1"
							aria-invalid={Boolean($errors.students)}
							aria-required="true"
							aria-describedby={getFieldErrorId('class-students', Boolean($errors.students))}
							disabled={isFormBusy}
						/>
					</FormField>

					<FormField id="class-status" label="Status">
						<Select.Root
							type="single"
							value={$form.status}
							disabled={isFormBusy}
							onValueChange={handleStatusChange}
						>
							<Select.Trigger id="class-status" class={selectTriggerClassName}>
								{selectedStatusLabel}
							</Select.Trigger>
							<Select.Content>
								{#each CLASS_STATUS_OPTIONS as statusOption (statusOption)}
									<Select.Item value={statusOption} label={CLASS_STATUS_LABELS[statusOption]}>
										{CLASS_STATUS_LABELS[statusOption]}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</FormField>
				</div>
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
