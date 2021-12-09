<script lang="ts">
	import { page } from '$app/stores';

	const MIN_PAGE = 1;
	const MAX_PAGE = 500;

	$: currentPage = Number($page.params?.page ?? 1);
</script>

<div class="paginator">
	<a class="paginator__anchor paginator__anchor--back" href="/movies/{MIN_PAGE}" sveltekit:prefetch
		><span class="paginator__anchor-symbol paginator__anchor-symbol--back">&#10094;</span>
		<span
			class="paginator__anchor-symbol paginator__anchor-symbol--back paginator__anchor-symbol--additional"
			>&#10094;</span
		> Pierwsza
	</a>
	<a
		class="paginator__anchor paginator__anchor--back"
		href="/movies/{Math.max(currentPage - 1, MIN_PAGE)}"
		sveltekit:prefetch
		><span class="paginator__anchor-symbol paginator__anchor-symbol--back">&#10094;</span> Poprzednia</a
	>
	<p class="paginator__description">
		Strona <span class="paginator__page-number">{currentPage}</span> z
		<span class="paginator__page-number">{MAX_PAGE}</span>
	</p>
	<a
		class="paginator__anchor paginator__anchor--forward"
		href="/movies/{Math.min(currentPage + 1, MAX_PAGE)}"
		sveltekit:prefetch
		>Następna <span class="paginator__anchor-symbol paginator__anchor-symbol--forward"
			>&#10095;</span
		></a
	>
	<a
		class="paginator__anchor paginator__anchor--forward"
		href="/movies/{MAX_PAGE}"
		sveltekit:prefetch
		>Ostatnia <span class="paginator__anchor-symbol paginator__anchor-symbol--forward"
			>&#10095;</span
		><span
			class="paginator__anchor-symbol paginator__anchor-symbol--forward paginator__anchor-symbol--additional"
			>&#10095;</span
		></a
	>
</div>

<style lang="postcss">
	.paginator {
		width: max-content;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: clamp(0.625rem, 1vw + 0.25rem, 1rem);

		&__anchor {
			display: flex;
			align-items: center;
			color: var(--secondary-main-font);
			text-decoration: none;
			padding: 0.5rem 1rem;
			font-size: 0;

			@media screen and (min-width: 768px) {
				font-size: inherit;
				gap: 0.5rem;
			}

			&--back {
				background-color: var(--primary-accent-background);
			}

			&--forward {
				background-color: var(--secondary-accent-background);
			}
		}

		&__description {
			margin: 0 1rem;
		}

		&__page-number {
			font-family: Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial,
				sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
			font-weight: 600;
		}

		&__anchor-symbol {
			font-size: 0.5rem;

			&--forward {
				color: #0085e5;
			}

			&--additional {
				@media screen and (min-width: 768px) {
					display: none;
				}
			}
		}
	}
</style>
