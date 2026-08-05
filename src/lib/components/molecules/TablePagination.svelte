<script lang="ts">
	import * as Pagination from '$lib/components/atoms/Pagination/index.js';

	export type TablePaginationPageChangeHandler = (page: number) => void;

	export interface TablePaginationProps {
		count: number;
		page: number;
		perPage: number;
		onPageChange: TablePaginationPageChangeHandler;
	}

	let { count, page, perPage, onPageChange }: TablePaginationProps = $props();

	const shouldShowPagination = $derived<boolean>(count > perPage);
</script>

{#if shouldShowPagination}
	<Pagination.Root
		{count}
		{perPage}
		{page}
		{onPageChange}
		aria-label="Table pagination"
		class="mt-4"
	>
		{#snippet children({ pages, currentPage })}
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.Previous />
				</Pagination.Item>
				{#each pages as pageItem (pageItem.key)}
					{#if pageItem.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link page={pageItem} isActive={currentPage === pageItem.value} />
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.Next />
				</Pagination.Item>
			</Pagination.Content>
		{/snippet}
	</Pagination.Root>
{/if}
