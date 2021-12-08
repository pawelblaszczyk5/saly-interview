<script lang="ts">
	import { GENRES } from '$lib/constants/genres';

	export let genres: Array<number>;
</script>

<div class="movies-genres">
	{#each genres as genre (genre)}
		<span class="movies-genres__genre">
			{GENRES[genre]}
		</span>
	{/each}
</div>

<style lang="postcss">
	.movies-genres {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(0.25em, 1vw, 0.5em);
		font-size: var(--genres-font-size, 16px);

		&__genre {
			display: inline-block;
			font-size: clamp(0.75em, 1vw + 0.5rem, 0.875em);
			padding: 0.25em 0.5em;
			color: var(--secondary-main-font);
			background-color: var(--primary-accent-background);
		}
	}
</style>
