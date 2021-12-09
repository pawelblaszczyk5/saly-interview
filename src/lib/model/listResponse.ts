import type { MovieListResult } from '$lib/model/movieListResult';

export interface ListResponse {
	created_by: string;
	description: string;
	favorite_count: number;
	id: string;
	items: Array<MovieListResult>;
	item_count: number;
	iso_639_1: string;
	name: string;
	poster_path?: string;
}
