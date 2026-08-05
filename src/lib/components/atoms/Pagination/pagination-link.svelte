<script lang="ts">
	import { Pagination as PaginationPrimitive } from 'bits-ui';
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant
	} from '$lib/components/atoms/Button/index.js';
	import { cn } from '$lib/utils/index.js';

	export interface PaginationLinkProps extends PaginationPrimitive.PageProps {
		size?: ButtonSize;
		isActive: boolean;
	}

	let {
		ref = $bindable(null),
		class: className,
		size = 'icon',
		isActive,
		page,
		children,
		...restProps
	}: PaginationLinkProps = $props();

	const linkVariant = $derived<ButtonVariant>(isActive ? 'secondary' : 'ghost');
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	bind:ref
	{page}
	aria-current={isActive ? 'page' : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	data-size={size}
	class={cn(buttonVariants({ size, variant: linkVariant }), className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.Page>
