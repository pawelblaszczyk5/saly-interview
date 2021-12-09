import type { RequestHandler } from '@sveltejs/kit';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { getParamsWithSessionId } from '$lib/helpers/getParamsWithSessionId';

export const post: RequestHandler = async (request) => {
	const params = getParamsWithSessionId(request);

	await fetch(`${API_URL_PREFIX}list/${request.query.get('listId')}/add_item?${params}`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ media_id: request.query.get('movieId') }),
	});

	return {};
};
