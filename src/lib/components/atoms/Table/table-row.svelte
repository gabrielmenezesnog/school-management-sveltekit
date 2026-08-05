<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();
</script>

<tr
	bind:this={ref}
	data-slot="table-row"
	class={cn(
		'border-border data-[state=selected]:bg-muted border-b transition-colors duration-150 motion-reduce:transition-none',
		'hover:bg-indigo-50',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</tr>
