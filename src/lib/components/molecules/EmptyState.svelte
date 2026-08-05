<script lang="ts">
	import { CloudOff, RefreshCw } from '@lucide/svelte';
	import * as Alert from '$lib/components/atoms/Alert/index.js';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import type { AlertVariant } from '$lib/components/atoms/Alert/index.js';
	import { cn } from '$lib/utils/cn';

	export type EmptyStateActionHandler = () => void | Promise<void>;

	export interface EmptyStateProps {
		heading: string;
		description: string;
		variant?: AlertVariant;
		actionLabel?: string;
		isActionPending?: boolean;
		onAction?: EmptyStateActionHandler;
	}

	const EMPTY_STATE_ICON_SIZE_PX = 48;

	let {
		heading,
		description,
		variant = 'default',
		actionLabel = '',
		isActionPending = false,
		onAction
	}: EmptyStateProps = $props();

	const hasAction = $derived<boolean>(Boolean(onAction) && Boolean(actionLabel));

	async function handleActionClick(): Promise<void> {
		if (!onAction) {
			return;
		}

		await onAction();
	}
</script>

<Alert.Root
	{variant}
	class={cn(
		'border-border bg-card w-full items-center justify-items-center rounded-md border px-6 py-15 text-center shadow-(--shadow-sm)',
		'has-[>svg]:grid-cols-1 has-[>svg]:gap-0 *:[svg]:mx-auto *:[svg]:mb-4'
	)}
>
	<CloudOff
		size={EMPTY_STATE_ICON_SIZE_PX}
		aria-hidden="true"
		class={cn('text-muted-foreground opacity-50')}
	/>
	<Alert.Title
		class={cn('font-heading text-foreground mb-1.5 justify-self-center text-base font-semibold')}
	>
		{heading}
	</Alert.Title>
	<Alert.Description
		class={cn('font-body text-muted-foreground mx-auto mb-5 max-w-md justify-self-center text-sm')}
	>
		{description}
	</Alert.Description>
	{#if hasAction && onAction}
		<Alert.Action class="static top-auto right-auto mt-0 justify-self-center">
			<Button type="button" size="sm" disabled={isActionPending} onclick={handleActionClick}>
				{#if isActionPending}
					<RefreshCw class="size-4 animate-spin" aria-hidden="true" />
					Trying again…
				{:else}
					<RefreshCw class="size-4" aria-hidden="true" />
					{actionLabel}
				{/if}
			</Button>
		</Alert.Action>
	{/if}
</Alert.Root>
