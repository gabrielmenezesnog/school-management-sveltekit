<script lang="ts">
	import { Skeleton } from '$lib/components/atoms/Skeleton/index.js';
	import * as Table from '$lib/components/atoms/Table/index.js';
	import {
		SCHOOLS_TABLE_COLUMN_COUNT,
		SCHOOLS_TABLE_SKELETON_ROW_COUNT
	} from '$lib/features/schools/constants';
	import { cn } from '$lib/utils/cn';

	const LIST_INDEX_START = 0;

	const LIST_INDEX_STEP = 1;

	function createIndexList(length: number): number[] {
		const indexes: number[] = [];

		for (let index = LIST_INDEX_START; index < length; index += LIST_INDEX_STEP) {
			indexes.push(index);
		}

		return indexes;
	}

	const skeletonRows = createIndexList(SCHOOLS_TABLE_SKELETON_ROW_COUNT);

	const skeletonColumns = createIndexList(SCHOOLS_TABLE_COLUMN_COUNT);
</script>

<div
	aria-busy="true"
	aria-live="polite"
	class={cn(
		'w-full overflow-hidden',
		'border-border bg-card rounded-md border shadow-(--shadow-sm)'
	)}
>
	<p class="sr-only">Loading schools</p>
	<Table.Root class="min-w-[720px]">
		<Table.Header class="bg-navy-50 [&_tr]:border-border [&_tr]:border-b-2">
			<Table.Row class="hover:bg-navy-50">
				{#each skeletonColumns as columnIndex (columnIndex)}
					<Table.Head class="h-auto px-4 py-2.5">
						<Skeleton class="h-3 w-16" />
					</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each skeletonRows as rowIndex (rowIndex)}
				<Table.Row class="border-border border-b hover:bg-transparent">
					{#each skeletonColumns as columnIndex (`${rowIndex}-${columnIndex}`)}
						<Table.Cell class="px-4 py-3">
							<Skeleton class="h-3.5 w-full max-w-40" />
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
