<script lang="ts">
	import { AlertCircle } from '@lucide/svelte';
	import { Label } from '$lib/components/atoms/Label/index.js';
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	export interface FormFieldProps {
		id: string;
		label: string;
		isRequired?: boolean;
		errorMessage?: string;
		children: Snippet;
	}

	const FORM_FIELD_ERROR_ICON_SIZE_PX = 12;

	let { id, label, isRequired = false, errorMessage = '', children }: FormFieldProps = $props();

	const hasError = $derived<boolean>(Boolean(errorMessage));
	const errorId = $derived<string>(`${id}-error`);
</script>

<div class="flex flex-col gap-1.5">
	<Label for={id} class={cn('font-body text-foreground text-xs font-medium tracking-[0.01em]')}>
		{label}
		{#if isRequired}
			<span class="text-destructive ms-0.5" aria-hidden="true">*</span>
		{/if}
	</Label>

	{@render children()}

	{#if hasError}
		<p
			id={errorId}
			role="alert"
			class={cn('text-destructive font-body flex items-center gap-1 text-xs')}
		>
			<AlertCircle size={FORM_FIELD_ERROR_ICON_SIZE_PX} aria-hidden="true" class="shrink-0" />
			{errorMessage}
		</p>
	{/if}
</div>
