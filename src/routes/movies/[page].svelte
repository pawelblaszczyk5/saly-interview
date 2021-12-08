<script lang="ts" context="module">
	export const load: Load = async ({ fetch, page }) => {
		const params = new URLSearchParams(page.params);
		const movies = await (await fetch(`/api/movie/list?${params}`)).json();

		return {
			props: {
				movies,
			},
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { MovieListResponse } from '$lib/model/movieListResponse';

	import Meta from '$lib/components/Meta.svelte';
	import MoviesList from '$lib/components/MoviesList.svelte';

	export let movies: MovieListResponse;
</script>

<Meta />

<MoviesList movies={movies.results} />
