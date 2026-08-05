<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import EmptyState from '$lib/components/molecules/EmptyState.svelte';
	import { API_UNAVAILABLE_MESSAGE } from '$lib/constants/apiAvailability';
	import { APP_BRAND_NAME } from '$lib/constants/appHeader';
	import { HTTP_NOT_FOUND, HTTP_SERVICE_UNAVAILABLE } from '$lib/constants/httpStatus';
	import { cn } from '$lib/utils/cn';

	let isRetrying = $state<boolean>(false);

	const errorMessage = $derived<string>(page.error?.message || API_UNAVAILABLE_MESSAGE);

	const isApiUnavailable = $derived<boolean>(page.status === HTTP_SERVICE_UNAVAILABLE);

	const isNotFound = $derived<boolean>(page.status === HTTP_NOT_FOUND);

	const heading = $derived.by((): string => {
		if (isNotFound) {
			return 'School not found';
		}

		if (isApiUnavailable) {
			return 'API unavailable';
		}

		return 'Something went wrong';
	});

	const pageTitle = $derived<string>(`${heading} — ${APP_BRAND_NAME}`);

	const shouldShowRetry = $derived<boolean>(!isNotFound);

	async function handleRetry(): Promise<void> {
		isRetrying = true;

		try {
			await invalidateAll();
		} finally {
			isRetrying = false;
		}
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class={cn('w-full')}>
	{#if shouldShowRetry}
		<EmptyState
			{heading}
			description={errorMessage}
			variant={isApiUnavailable ? 'default' : 'destructive'}
			actionLabel="Try again"
			isActionPending={isRetrying}
			onAction={handleRetry}
		/>
	{:else}
		<EmptyState {heading} description={errorMessage} variant="destructive" />
	{/if}
</div>
