<script lang="ts" context="module">
	export const load: Load = async ({ fetch }) => {
		const { result } = await (await fetch('/api/lists')).json();

		return {
			props: {
				lists: result,
			},
		};
	};
</script>

<script lang="ts">
	import type { List } from '$lib/model/list';
	import type { Load } from '@sveltejs/kit';

	import AddListButton from '$lib/components/AddListButton.svelte';

	export let lists: Array<List>;
</script>

<div class="lists-heading">
	<h1 class="lists-heading__title">Twoje listy ({lists.length})</h1>
	<div class="lists-heading__button-container--desktop">
		<AddListButton />
	</div>
</div>

<div class="lists-heading__button-container--mobile">
	<AddListButton />
</div>

<style lang="postcss">
	.lists-heading {
		display: flex;
		justify-content: space-between;
		margin-bottom: clamp(1rem, 5vw + 0.25rem, 3.875rem);

		&__title {
			font-size: clamp(2rem, 3vw + 1rem, 2.5rem);
		}

		&__button-container {
			&--desktop {
				display: none;
			}

			@media screen and (min-width: 768px) {
				&--mobile {
					display: none;
				}

				&--desktop {
					display: initial;
				}
			}
		}
	}
</style>
