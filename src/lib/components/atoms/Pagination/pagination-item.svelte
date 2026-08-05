<script lang="ts">
	import type { WithElementRef } from '$lib/utils/index.js';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export type PaginationItemProps = WithElementRef<HTMLLiAttributes>;

	let { ref = $bindable(null), children, ...restProps }: PaginationItemProps = $props();
</script>

<li bind:this={ref} data-slot="pagination-item" {...restProps}>
	{@render children?.()}
</li>
