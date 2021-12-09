import type { RequestHandler } from '@sveltejs/kit';
import type { MovieListResponse } from '$lib/model/movieListResponse';

import { LANGUAGE } from '$lib/constants/language';
import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';
import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const get: RequestHandler = async (request) => {
	const query = request.query.get('query');
	const params = new URLSearchParams(PARAMS_WITH_API_KEY);

	params.set('query', query);
	params.set('language', LANGUAGE);

	const { results: movies }: MovieListResponse = await (
		await fetch(`${API_URL_PREFIX}search/movie?${params}`)
	).json();

	return {
		body: {
			movies,
		},
	};
};
