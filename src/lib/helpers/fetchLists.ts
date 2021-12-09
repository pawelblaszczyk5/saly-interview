import type { UserListsResponse } from '$lib/model/userListsResponse';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { getParamsWithSessionId } from '$lib/helpers/getParamsWithSessionId';

export const fetchLists = async (request: ServerRequest, page = 1): Promise<UserListsResponse> => {
	const params = getParamsWithSessionId(request);

	params.set('page', page.toString());

	return await (
		await fetch(`${API_URL_PREFIX}account/${import.meta.env.VITE_TMDB_USER_ID}/lists?${params}`)
	).json();
};
