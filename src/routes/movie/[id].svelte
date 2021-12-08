<script lang="ts" context="module">
	export const load: Load = async ({ page, fetch }) => {
		const params = new URLSearchParams(page.params);
		const { credits, details } = await (await fetch(`/api/movie?${params}`)).json();

		console.log(credits, details);
		return {
			props: {
				credits,
				details,
			},
		};
	};
</script>

<script lang="ts">
	import MovieGenres from '$lib/components/MovieGenres.svelte';
	import MovieRating from '$lib/components/MovieRating.svelte';
	import type { MovieCreditsResponse } from '$lib/model/movieCreditsResponse';
	import type { MovieDetailsResponse } from '$lib/model/movieDetailsResponse';
	import type { Load } from '@sveltejs/kit';

	export let credits: MovieCreditsResponse;
	export let details: MovieDetailsResponse;

	const formatReleaseDate = (date: string) => {
		const [year, month, day] = date.split('-');

		return `${day}.${month}.${year}`;
	};

	$: movieRelaseYear = details.release_date.split('-')[0];
	$: formattedReleaseDate = formatReleaseDate(details.release_date);
</script>

<section class="movie">
	<article class="movie__info">
		<img
			class="movie__poster"
			src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/{details.poster_path}"
			alt={details.title}
		/>
		<div class="movie__details">
			<h1 class="movie__title">{details.title}</h1>
			<p class="movie__detail">
				{movieRelaseYear}
			</p>
			<p class="movie__detail">
				<span
					><span class="movie__detail-name">Produkcja:</span>
					{details.production_countries[0].name}</span
				><br />
				<span><span class="movie__detail-name">Data premiery:</span> {formattedReleaseDate}</span>
			</p>
			<MovieGenres --genres-font-size="20px" genres={details.genres.map(({ id }) => id)} />
			<p class="movie__detail">
				{details.overview}
			</p>
			<div class="movie__rating-container">
				<MovieRating count={details.vote_count} average={details.vote_average} />
			</div>
		</div>
	</article>
</section>

<style lang="postcss">
	.movie {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 2vw + 1rem, 2.5rem);

		&__info {
			padding: clamp(1rem, 3vw + 0.25rem, 2.5rem);
			box-shadow: var(--primary-box-shadow);
			display: flex;
			gap: clamp(0.75rem, 5vw - 1.25rem, 2.5rem);
		}

		&__poster {
			width: 40%;
			height: 100%;
			align-self: center;

			@media screen and (min-width: 768px) {
				max-width: 460px;
			}
		}
		&__details {
			display: flex;
			flex-direction: column;
			gap: clamp(0.25rem, 4vw - 1rem, 2rem);
		}

		&__title {
			font-weight: 700;
			font-size: clamp(1.5rem, 3vw + 0.75rem, 3rem);
		}

		&__detail {
			font-size: clamp(0.75rem, 4vw - 1rem, 1.5rem);
		}

		&__detail-name {
			color: #74788b;
		}

		&__rating-container {
			margin-top: auto;
		}
	}
</style>
