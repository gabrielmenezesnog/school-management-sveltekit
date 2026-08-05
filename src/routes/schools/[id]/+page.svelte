<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import SchoolCard from '$lib/components/molecules/SchoolCard.svelte';
	import ClassesTable from '$lib/components/organisms/ClassesTable.svelte';
	import { CLASSES_SINGULAR_COUNT } from '$lib/features/classes/constants';
	import { APP_BRAND_NAME, SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { SCHOOLS_ROUTE } from '$lib/constants/routes';
	import { cn } from '$lib/utils/cn';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const schoolsHref = resolve(SCHOOLS_ROUTE);
	const classesHeadingId = 'school-classes-heading';

	const classesCountLabel = $derived<string>(
		data.schoolClasses.length === CLASSES_SINGULAR_COUNT
			? '1 class'
			: `${data.schoolClasses.length} classes`
	);
</script>

<svelte:head>
	<title>{data.school.name} — {APP_BRAND_NAME}</title>
</svelte:head>

<nav class={cn('mb-5 flex min-w-0 flex-wrap items-center gap-1.5')} aria-label="Breadcrumb">
	<a
		href={schoolsHref}
		class={cn(
			'font-heading text-muted-foreground hover:text-foreground text-sm font-medium',
			'transition-colors duration-150 motion-reduce:transition-none'
		)}
	>
		{SCHOOLS_NAV_LABEL}
	</a>
	<ChevronRight class="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
	<span class={cn('font-heading text-foreground truncate text-sm font-semibold')}>
		{data.school.name}
	</span>
</nav>

<SchoolCard school={data.school} />

<section class="mt-8" aria-labelledby={classesHeadingId}>
	<div class="mb-4 min-w-0">
		<h2
			id={classesHeadingId}
			class={cn('font-heading text-foreground text-lg font-semibold tracking-[-0.01em]')}
		>
			Classes
		</h2>
		<p class={cn('font-body text-muted-foreground mt-1 text-sm')}>
			{classesCountLabel}
		</p>
	</div>

	<div class="w-full overflow-x-auto">
		<ClassesTable schoolClasses={data.schoolClasses} />
	</div>
</section>
