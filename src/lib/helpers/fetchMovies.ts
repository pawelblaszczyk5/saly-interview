import { LANGUAGE } from '$lib/constants/language';
import { API_URL_PREFIX } from '$lib/constants/apiUrlPrefix';
import { PARAMS_WITH_API_KEY } from '$lib/constants/paramsWithApiKey';
import type { MovieListResponse } from '$lib/model/movieListResponse';

export const fetchMovies = async (page: number): Promise<MovieListResponse> => {
	const params = new URLSearchParams(PARAMS_WITH_API_KEY);

	params.set('language', LANGUAGE);
	params.set('page', page.toString());

	return await (await fetch(`${API_URL_PREFIX}movie/popular?${params}`)).json();
};
