<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/atoms/Button/index.js';
	import { SCHOOLS_TABLE_ADD_ICON_SIZE_PX } from '$lib/features/schools/constants';
	import { SCHOOLS_NAV_LABEL } from '$lib/constants/appHeader';
	import { cn } from '$lib/utils/cn';

	export type SchoolsPageHeaderAddHandler = () => void;

	export interface SchoolsPageHeaderProps {
		statusLabel: string;
		isAddDisabled: boolean;
		onAddSchool: SchoolsPageHeaderAddHandler;
	}

	let { statusLabel, isAddDisabled, onAddSchool }: SchoolsPageHeaderProps = $props();
</script>

<div class={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4')}>
	<div class="min-w-0">
		<h1
			class={cn(
				'font-heading text-2xl font-bold tracking-[-0.02em] sm:text-[2rem]',
				'text-(--foreground)'
			)}
		>
			{SCHOOLS_NAV_LABEL}
		</h1>
		<p class={cn('font-body mt-1.5 text-sm', 'text-(--muted-foreground)')}>
			{statusLabel}
		</p>
	</div>

	<Button
		type="button"
		class="w-full shrink-0 sm:w-auto"
		disabled={isAddDisabled}
		onclick={onAddSchool}
	>
		<Plus size={SCHOOLS_TABLE_ADD_ICON_SIZE_PX} aria-hidden="true" />
		New school
	</Button>
</div>
