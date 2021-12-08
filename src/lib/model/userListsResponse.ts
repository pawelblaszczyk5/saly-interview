import type { List } from '$lib/model/list';

export interface UserListsResponse {
	page: number;
	results: Array<List>;
	total_pages: number;
	total_results: number;
}
