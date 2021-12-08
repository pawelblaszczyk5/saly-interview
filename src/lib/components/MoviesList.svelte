<script lang="ts">
	import type { MovieListResult } from '$lib/model/movieListResult';

	export let movies: Array<MovieListResult>;
</script>

{#each movies as movie (movie.id)}
	<div>
		<p>{movie.title}</p>
	</div>
{/each}
