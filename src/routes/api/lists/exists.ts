import type { RequestHandler } from '@sveltejs/kit';
import type { UserListsResponse } from '$lib/model/userListsResponse';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { getParamsWithSessionId } from '$lib/helpers/getParamsWithSessionId';

export const get: RequestHandler = async (request) => {
	const userListsResponse: UserListsResponse = await (
		await fetch(
			`${API_URL_PREFIX}account/${import.meta.env.VITE_TMDB_USER_ID}/lists?${getParamsWithSessionId(
				request,
			)}`,
		)
	).json();

	return {
		body: `${userListsResponse.total_results > 0}`,
	};
};
