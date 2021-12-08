import type { MovieListResult } from '$lib/model/movieListResult';

export interface MovieListResponse {
	page: number;
	total_results: number;
	total_pages: number;
	results: Array<MovieListResult>;
}
