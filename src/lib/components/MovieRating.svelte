<script lang="ts">
	export let count: number;
	export let average: number;
</script>

<p class="movie-rating">
	{average} <span class="movie-rating__counter">({count} głosów)</span>
</p>

<style lang="postcss">
	.movie-rating {
		font-size: clamp(0.75rem, 1vw + 0.5rem, 1rem);
		font-weight: 500;

		&__counter {
			font-weight: 400;
			color: var(--secondary-accent-font);
		}
	}
</style>
