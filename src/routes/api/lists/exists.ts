import type { RequestHandler } from '@sveltejs/kit';

import { fetchLists } from '$lib/helpers/fetchLists';

export const get: RequestHandler = async (request) => {
	const userListsResponse = await fetchLists(request);

	return {
		body: `${userListsResponse.total_results > 0}`,
	};
};
