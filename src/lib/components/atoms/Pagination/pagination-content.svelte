<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	export type PaginationContentProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: PaginationContentProps = $props();
</script>

<ul
	bind:this={ref}
	data-slot="pagination-content"
	class={cn('flex items-center gap-0.5', className)}
	{...restProps}
>
	{@render children?.()}
</ul>
