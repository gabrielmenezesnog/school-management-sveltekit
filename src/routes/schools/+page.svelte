<script lang="ts">
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { cn } from '$lib/utils/cn';
</script>

<svelte:head>
	<title>{SCHOOLS_NAV_LABEL} — {APP_BRAND_NAME}</title>
</svelte:head>

<div class={cn('mx-auto w-full max-w-7xl', 'px-4 py-6 sm:px-6 sm:py-8')}>
	<h1
		class={cn(
			'font-heading text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]',
			'text-(--foreground)'
		)}
	>
		{SCHOOLS_NAV_LABEL}
	</h1>
	<p class={cn('font-body mt-1.5 text-sm', 'text-(--muted-foreground)')}>
		School registry for the municipal education department.
	</p>
</div>
