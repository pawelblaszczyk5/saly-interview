import type { RequestHandler } from '@sveltejs/kit';

import { fetchMovies } from '$lib/helpers/fetchMovies';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const get: RequestHandler = async (request) => {
	const movies = await fetchMovies(Number(request.query.get('page') ?? 1));

	return {
		body: { ...movies },
	};
};
