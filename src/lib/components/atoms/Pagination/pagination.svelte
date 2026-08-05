<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import {
		PAGINATION_DEFAULT_PER_PAGE,
		PAGINATION_DEFAULT_SIBLING_COUNT,
		PAGINATION_EMPTY_COUNT,
		PAGINATION_FIRST_PAGE
	} from '$lib/constants/pagination';
	import { cn } from '$lib/utils/index.js';

	export type PaginationRootProps = PaginationPrimitive.RootProps;

	let {
		ref = $bindable(null),
		class: className,
		count = PAGINATION_EMPTY_COUNT,
		perPage = PAGINATION_DEFAULT_PER_PAGE,
		page = $bindable(PAGINATION_FIRST_PAGE),
		siblingCount = PAGINATION_DEFAULT_SIBLING_COUNT,
		...restProps
	}: PaginationRootProps = $props();
</script>

<PaginationPrimitive.Root
	bind:ref
	bind:page
	role="navigation"
	aria-label="Pagination"
	data-slot="pagination"
	{count}
	{perPage}
	{siblingCount}
	class={cn('mx-auto flex w-full justify-center', className)}
	{...restProps}
/>
