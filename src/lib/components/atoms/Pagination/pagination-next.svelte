<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { buttonVariants } from '$lib/components/atoms/Button/index.js';
	import { cn } from '$lib/utils/index.js';

	export type PaginationNextProps = PaginationPrimitive.NextButtonProps;

	let { ref = $bindable(null), class: className, ...restProps }: PaginationNextProps = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'pr-1.5!', className)}
	{...restProps}
>
	<span class="hidden sm:block">Next</span>
	<ChevronRightIcon data-icon="inline-end" aria-hidden="true" />
</PaginationPrimitive.NextButton>
