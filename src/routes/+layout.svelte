<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '$lib/components/organisms/AppHeader.svelte';
	import { MAIN_CONTENT_ID } from '$lib/constants/routes';
	import { isSchoolsSectionPath } from '$lib/utils/isSchoolsSectionPath';
	import { cn } from '$lib/utils/cn';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	import '../app.css';

	export interface LayoutProps {
		children: Snippet;
	}

	let { children }: LayoutProps = $props();

	const isSchoolsNavActive = $derived(isSchoolsSectionPath(page.url.pathname));
	const mainContentHref = `#${MAIN_CONTENT_ID}`;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href={mainContentHref}
	class={cn(
		'z-skip-link absolute top-0 left-4 -translate-y-[120%]',
		'rounded px-4 py-2',
		'font-heading text-sm font-semibold text-white no-underline',
		'bg-indigo-500',
		'transition-transform duration-200 ease-(--ease-standard) motion-reduce:transition-none',
		'focus:translate-y-3 focus:outline-2 focus:outline-offset-2 focus:outline-(--ring)'
	)}
>
	Skip to main content
</a>

<div class="flex min-h-screen flex-col">
	<AppHeader {isSchoolsNavActive} />

	<main id={MAIN_CONTENT_ID} class="flex-1" tabindex="-1">
		{@render children()}
	</main>
</div>
