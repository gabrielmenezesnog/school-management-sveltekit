<script lang="ts">
	import { Loader2, Trash2 } from '@lucide/svelte';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import * as Dialog from '$lib/components/atoms/Dialog/index.js';
	import { cn } from '$lib/utils/cn';

	export type ConfirmDialogConfirmHandler = () => void | Promise<void>;
	export type ConfirmDialogCancelHandler = () => void;

	export interface ConfirmDialogProps {
		open: boolean;
		title: string;
		description: string;
		confirmLabel?: string;
		isConfirming?: boolean;
		onConfirm: ConfirmDialogConfirmHandler;
		onCancel: ConfirmDialogCancelHandler;
	}

	const CONFIRM_DIALOG_ICON_SIZE_PX = 22;

	let {
		open = $bindable(false),
		title,
		description,
		confirmLabel = 'Delete',
		isConfirming = false,
		onConfirm,
		onCancel
	}: ConfirmDialogProps = $props();

	async function handleConfirmClick(): Promise<void> {
		await onConfirm();
	}

	function handleOpenChange(isOpen: boolean): void {
		if (isOpen || isConfirming) {
			return;
		}

		onCancel();
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content
		showCloseButton={false}
		interactOutsideBehavior="ignore"
		class={cn('max-w-md gap-0 p-8')}
	>
		<div
			class={cn(
				'bg-danger-100 text-danger-600 mb-5 flex size-12 items-center justify-center rounded-full'
			)}
			aria-hidden="true"
		>
			<Trash2 size={CONFIRM_DIALOG_ICON_SIZE_PX} />
		</div>

		<Dialog.Header class="gap-2 text-start">
			<Dialog.Title class="font-heading text-lg font-semibold">{title}</Dialog.Title>
			<Dialog.Description class="font-body text-muted-foreground text-sm leading-relaxed">
				{description}
			</Dialog.Description>
		</Dialog.Header>

		<Dialog.Footer class="mt-7 gap-2.5 sm:justify-end">
			<Button type="button" variant="ghost" disabled={isConfirming} autofocus onclick={onCancel}>
				Cancel
			</Button>
			<Button
				type="button"
				variant="destructive"
				class="min-w-28"
				disabled={isConfirming}
				onclick={handleConfirmClick}
			>
				{#if isConfirming}
					<Loader2 class="size-4 animate-spin" aria-hidden="true" />
					Deleting…
				{:else}
					{confirmLabel}
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
