export interface MovieDetailsResponse {
	adult: boolean;
	backdrop_path?: string;
	belongs_to_collection?: Record<string, unknown>;
	budget: number;
	genres: Array<{ id: number; name: string }>;
	homepage?: string;
	id: number;
	imdb_id?: string;
	original_language: string;
	original_title: string;
	overview?: string;
	popularity: number;
	poster_path?: string;
	production_companies: Array<{
		name: string;
		id: number;
		logo_path?: string;
		origin_country: string;
	}>;
	production_countries: Array<{ iso_3166_1: string; name: string }>;
	relase_date: string;
	revenue: number;
	runtime?: number;
	spoken_languages: Array<{ iso_639_1: string; name: string }>;
	status: string;
	tagline?: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
