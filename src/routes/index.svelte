<script lang="ts" context="module">
	export const load: Load = async ({ fetch }) => {
		const movies = await (await fetch('/api/movie/list')).json();

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

<MoviesList movies={movies.results} />

<Meta />
