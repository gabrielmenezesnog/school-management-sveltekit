<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import { buttonVariants } from '$lib/components/atoms/Button/index.js';
	import { cn } from '$lib/utils/index.js';

	export type PaginationPreviousProps = PaginationPrimitive.PrevButtonProps;

	let { ref = $bindable(null), class: className, ...restProps }: PaginationPreviousProps = $props();
</script>

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'pl-1.5!', className)}
	{...restProps}
>
	<ChevronLeftIcon data-icon="inline-start" aria-hidden="true" />
	<span class="hidden sm:block">Previous</span>
</PaginationPrimitive.PrevButton>
