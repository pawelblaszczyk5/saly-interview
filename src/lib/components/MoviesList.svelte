<script lang="ts">
	import type { MovieListResult } from '$lib/model/movieListResult';

	import MovieGenres from '$lib/components/MovieGenres.svelte';
	import MovieRating from '$lib/components/MovieRating.svelte';
	import placeholderImage from '$lib/assets/placeholder-image.jpg';
	import { createEventDispatcher } from 'svelte';
	import PlusButton from '$lib/components/PlusButton.svelte';
	import RemoveButton from '$lib/components/RemoveButton.svelte';

	export let movies: Array<MovieListResult>;
	export let action: 'remove' | 'add' | undefined = undefined;

	const dispatch = createEventDispatcher<{ remove: number; add: MovieListResult }>();

	const add = (movie: MovieListResult) => dispatch('add', movie);
	const remove = (id: number) => dispatch('remove', id);
</script>

<section class="movies-list">
	{#each movies as movie (movie.id)}
		<article class="movies-list__movie">
			<a href="/movie/{movie.id}" sveltekit:prefetch>
				<img
					class="movies-list__movie-poster"
					src={movie.poster_path
						? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
						: placeholderImage}
					alt={movie.title}
				/>
			</a>
			<div class="movies-list__movie-details">
				<div class="movies-list__movie-title-container">
					<a class="movies-list__movie-anchor" href="/movie/{movie.id}" sveltekit:prefetch>
						<h1 title={movie.title} class="movies-list__movie-title">{movie.title}</h1>
					</a>
					<div class="movies-list__movie-button-container">
						{#if action === 'add'}
							<PlusButton on:click={() => add(movie)} />
						{:else if action === 'remove'}
							<RemoveButton on:click={() => remove(movie.id)} />
						{/if}
					</div>
				</div>
				<div class="movies-list__movie-genres-container">
					<MovieGenres genres={movie.genre_ids} />
				</div>
				<div class="movies-list__movie-rating-container">
					<MovieRating average={movie.vote_average} count={movie.vote_count} />
				</div>
			</div>
		</article>
	{/each}
</section>

<style lang="postcss">
	.movies-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(0.5rem, 3vw - 0.5rem, 1.25rem);

		@media screen and (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (min-width: 1280px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media screen and (min-width: 1536px) {
			grid-template-columns: repeat(4, 1fr);
		}

		&__movie {
			padding: clamp(1rem, 2vw + 0.5rem, 1.875rem);
			box-shadow: var(--primary-box-shadow);
			gap: clamp(0.5rem, 3vw - 0.5rem, 1.5rem);
			display: flex;
			overflow: hidden;

			@media screen and (min-width: 768px) {
				flex-direction: column;
			}
		}

		&__movie-poster {
			max-width: 120px;
			border-radius: clamp(0.75rem, 4vw - 0.25rem, 3rem);

			@media screen and (min-width: 768px) {
				max-width: 100%;
			}
		}

		&__movie-title-container {
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			max-width: 100%;
		}

		&__movie-details {
			display: flex;
			flex-direction: column;
			height: 100%;
			width: 100%;
			overflow: hidden;
		}

		&__movie-button-container {
			margin-bottom: clamp(0.75rem, 2vw + 0.25rem, 1.5rem);
		}

		&__movie-title {
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
			font-weight: 500;
			font-size: clamp(1.5rem, 2vw + 1rem, 2rem);
			margin-bottom: clamp(0.75rem, 2vw + 0.25rem, 1.5rem);
		}

		&__movie-anchor {
			color: inherit;
			text-decoration: none;
			width: calc(100% - 40px);
		}

		&__movie-rating-container {
			margin-top: auto;
		}

		&__movie-genres-container {
			margin-bottom: 2rem;
		}
	}
</style>
