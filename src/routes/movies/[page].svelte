<script lang="ts" context="module">
	export const hydrate = false;
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
	import MoviePaginator from '$lib/components/MoviePaginator.svelte';

	export let movies: MovieListResponse;
</script>

<Meta />

<h1 class="heading">Wszystkie filmy</h1>
<MoviesList movies={movies.results} />
<div class="paginator-container">
	<MoviePaginator />
</div>

<style lang="postcss">
	.paginator-container {
		margin: clamp(1.5rem, 5vw + 0.5rem, 5rem) auto 0;
		width: max-content;
	}

	.heading {
		margin-bottom: clamp(1rem, 5vw + 0.25rem, 3.875rem);
		font-size: clamp(2rem, 3vw + 1rem, 2.5rem);
	}
</style>
