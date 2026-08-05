import { describe, expect, it } from 'vitest';
import { paginateItems } from '$lib/utils/paginateItems';

describe('paginateItems', () => {
	it('returns the first page slice', () => {
		const pagedItems = paginateItems({
			items: [1, 2, 3, 4, 5],
			page: 1,
			perPage: 2
		});

		expect(pagedItems).toEqual([1, 2]);
	});

	it('returns a middle page slice', () => {
		const pagedItems = paginateItems({
			items: [1, 2, 3, 4, 5],
			page: 2,
			perPage: 2
		});

		expect(pagedItems).toEqual([3, 4]);
	});

	it('returns a partial final page', () => {
		const pagedItems = paginateItems({
			items: [1, 2, 3, 4, 5],
			page: 3,
			perPage: 2
		});

		expect(pagedItems).toEqual([5]);
	});

	it('returns an empty array when the page is past the end', () => {
		const pagedItems = paginateItems({
			items: [1, 2, 3],
			page: 4,
			perPage: 2
		});

		expect(pagedItems).toEqual([]);
	});
});
