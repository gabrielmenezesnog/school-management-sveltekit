<script lang="ts">
	import type { SkeletonProps } from './skeletonProps.js';
	import { cn } from '$lib/utils/index.js';

	let { ref = $bindable(null), class: className, ...restProps }: SkeletonProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="skeleton"
	class={cn('bg-muted animate-pulse rounded-md', className)}
	{...restProps}
></div>
