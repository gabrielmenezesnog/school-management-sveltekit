import { PAGINATION_FIRST_PAGE } from '$lib/constants/pagination';

export interface PaginateItemsParams<TItem> {
	items: TItem[];
	page: number;
	perPage: number;
}

export function paginateItems<TItem>({
	items,
	page,
	perPage
}: PaginateItemsParams<TItem>): TItem[] {
	const startIndex = (page - PAGINATION_FIRST_PAGE) * perPage;
	const endIndex = startIndex + perPage;

	return items.slice(startIndex, endIndex);
}
