import type { ListResponse } from '$lib/model/listResponse';
import type { RequestHandler } from '@sveltejs/kit';

import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { LANGUAGE } from '$lib/constants/language';
import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const get: RequestHandler = async (request) => {
	const params = new URLSearchParams(PARAMS_WITH_API_KEY);

	params.set('language', LANGUAGE);

	const response: ListResponse = await (
		await fetch(`${API_URL_PREFIX}/list/${request.query.get('id')}?${params}`)
	).json();

	return {
		body: response,
	};
};
