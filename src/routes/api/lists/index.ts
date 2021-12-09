import type { RequestHandler } from '@sveltejs/kit';
import type { List } from '$lib/model/list';

import { fetchLists } from '$lib/helpers/fetchLists';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const get: RequestHandler = async (request) => {
	const userLists: Array<List> = [];
	const userListsResponse = await fetchLists(request);
	const pageSize = userListsResponse.results.length;

	userLists.push(...userListsResponse.results);

	if (pageSize < userListsResponse.total_results) {
		const pages = Math.ceil(userListsResponse.total_results / pageSize) - 1;
		const userListsRequests = new Array(pages).fill(undefined).map((_, index) => {
			const pageNumber = index + 2;

			return fetchLists(request, pageNumber);
		});

		const userListsResponses = await Promise.all(userListsRequests);

		userListsResponses.forEach(({ results }) => {
			userLists.push(...results);
		});
	}

	return {
		body: {
			result: userLists,
		},
	};
};
