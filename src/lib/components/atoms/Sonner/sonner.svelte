<script lang="ts">
	import { CheckCircle2, Info, Loader2, TriangleAlert, XCircle } from '@lucide/svelte';
	import { Toaster as Sonner, type ToasterProps } from 'svelte-sonner';

	let { ...restProps }: ToasterProps = $props();
</script>

<Sonner theme="light" class="toaster group" position="bottom-right" {...restProps}>
	{#snippet loadingIcon()}
		<Loader2 class="size-4 animate-spin" aria-hidden="true" />
	{/snippet}
	{#snippet successIcon()}
		<CheckCircle2 class="text-success-600 size-4" aria-hidden="true" />
	{/snippet}
	{#snippet errorIcon()}
		<XCircle class="text-danger-500 size-4" aria-hidden="true" />
	{/snippet}
	{#snippet infoIcon()}
		<Info class="size-4 text-indigo-500" aria-hidden="true" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlert class="text-warning-600 size-4" aria-hidden="true" />
	{/snippet}
</Sonner>
