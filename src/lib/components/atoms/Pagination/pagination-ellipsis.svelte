<script lang="ts">
	import MoreHorizontalIcon from '@lucide/svelte/icons/more-horizontal';
	import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	export type PaginationEllipsisProps = WithoutChildren<
		WithElementRef<HTMLAttributes<HTMLSpanElement>>
	>;

	let { ref = $bindable(null), class: className, ...restProps }: PaginationEllipsisProps = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	data-slot="pagination-ellipsis"
	class={cn(
		'flex size-8 items-center justify-center',
		"[&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	<MoreHorizontalIcon aria-hidden="true" />
</span>
