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
	import MoviePaginator from '$lib/components/MoviePaginator.svelte';

	export let movies: MovieListResponse;
</script>

<Meta />

<MoviesList movies={movies.results} />
<div class="paginator-container">
	<MoviePaginator />
</div>

<style lang="postcss">
	.paginator-container {
		margin: clamp(1.5rem, 5vw + 0.5rem, 5rem) auto 0;
		width: max-content;
	}
</style>
