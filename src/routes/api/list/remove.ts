import type { RequestHandler } from '@sveltejs/kit';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { getParamsWithSessionId } from '$lib/helpers/getParamsWithSessionId';

export const del: RequestHandler = async (request) => {
	const params = getParamsWithSessionId(request);

	await fetch(`${API_URL_PREFIX}list/${request.query.get('id')}?${params}`, {
		method: 'delete',
	});

	return {};
};
