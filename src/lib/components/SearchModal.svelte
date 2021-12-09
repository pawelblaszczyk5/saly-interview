<script lang="ts">
	import type { MovieListResult } from '$lib/model/movieListResult';

	import MoviesList from '$lib/components/MoviesList.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let addMovie: (event: CustomEvent<MovieListResult>) => void;
	export let close: () => void;

	let movies: Array<MovieListResult> = [];
	let term: string;

	onMount(() => {
		document.body.style.setProperty('overflow', 'hidden');
	});

	onDestroy(() => {
		document.body.style.removeProperty('overflow');
	});

	const findMovies = async () => {
		const trimmedTerm = term.trim();

		if (!trimmedTerm) {
			return;
		}
		const params = new URLSearchParams({ query: trimmedTerm });
		const { movies: fetchedMovies } = await (await fetch(`/api/movie/find?${params}`)).json();

		movies = fetchedMovies;
	};
</script>

<div class="modal-overlay" on:click={close} />

<div class="modal-body">
	<h1 class="modal-body__title">Znajdź filmy, które chciałbyś dodać do listy</h1>
	<form class="modal-body__form" on:submit|preventDefault={findMovies}>
		<input class="modal-body__input" bind:value={term} />
		<button class="modal-body__button" type="submit">Szukaj</button>
	</form>
	{#if movies.length}
		<MoviesList action="add" {movies} on:add={addMovie} />
	{:else}
		<p class="modal-body__disclaimer">Wyszukaj filmy lub zmień słowa kluczowe</p>
	{/if}
</div>

<style lang="postcss">
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: #000d;
		z-index: 1;
	}

	.modal-body {
		position: fixed;
		top: 200px;
		height: calc(100vh - 300px);
		width: 100vw;
		left: 0;
		background-color: #fff;
		z-index: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: clamp(1.5rem, 4vw - 0.25rem, 3rem);

		@media screen and (min-width: 768px) {
			width: 80vw;
			left: 10vw;
		}

		&__title {
			font-size: clamp(0.875rem, 3vw - 0.25rem, 1.25rem);
			font-weight: 500;
			text-align: center;
			margin-bottom: clamp(0.875rem, 3vw - 0.25rem, 1.25rem);
		}

		&__form {
			display: flex;
			justify-content: center;
			max-width: 100%;
			align-items: stretch;
			gap: 0.5rem;
			margin-bottom: clamp(0.875rem, 3vw - 0.25rem, 1.25rem);
		}

		&__input {
			font-size: clamp(0.875rem, 3vw - 0.25rem, 1.25rem);
			max-width: 60%;
			padding: 0.25rem 0.5rem;
			border: 1px solid var(--primary-accent-background);
		}

		&__button {
			background: var(--secondary-accent-background);
			border: none;
			padding: 0.25rem 0.5rem;
		}

		&__disclaimer {
			text-align: center;
			color: var(--primary-accent-font);
			font-size: clamp(0.75rem, 1vw + 0.75rem, 1.25rem);
		}
	}
</style>
