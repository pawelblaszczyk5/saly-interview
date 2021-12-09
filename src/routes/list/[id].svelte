<script lang="ts" context="module">
	import type { ListResponse } from '$lib/model/listResponse';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const params = new URLSearchParams(page.params);
		const list: ListResponse = await (await fetch(`/api/list?${params}`)).json();

		return {
			props: {
				list,
			},
		};
	};
</script>

<script lang="ts">
	import type { MovieListResult } from '$lib/model/movieListResult';

	import AddButton from '$lib/components/AddButton.svelte';
	import MoviesList from '$lib/components/MoviesList.svelte';
	import Meta from '$lib/components/Meta.svelte';

	export let list: ListResponse;

	const turnOnSearch = () => {
		console.log('will search');
	};

	const remove = async ({ detail: id }: CustomEvent<number>) => {
		const params = new URLSearchParams({ movieId: id.toString(), listId: list.id });

		await fetch(`/api/list/removeMovie?${params}`, { method: 'post' });

		list.items = list.items.filter(({ id: idToRemove }) => idToRemove !== id);
	};

	const add = async ({ detail: movie }: CustomEvent<MovieListResult>) => {
		const params = new URLSearchParams({ movieId: movie.id.toString(), listId: list.id });

		await fetch(`/api/list/addMovie?${params}`, { method: 'post' });

		list.items = [...list.items, movie];
	};
</script>

<Meta title="Twoja lista - {list.name}" description={list.description} />

<div class="list-heading">
	<h1 class="list-heading__title">
		{list.name}
		<div class="list-heading__button-container--desktop">
			<AddButton on:click={turnOnSearch}><svelte:fragment>Dodaj film</svelte:fragment></AddButton>
		</div>
	</h1>
	<h2 class="list-heading__description">{list.description}</h2>
</div>

<section class="list">
	{#if list.items.length}
		<MoviesList action="remove" movies={list.items} on:remove={remove} />
	{:else}
		<p>Nie masz jeszcze filmów na tej liście, dodaj</p>
	{/if}
</section>

<div class="list-heading__button-container--mobile">
	<AddButton on:click={turnOnSearch}><svelte:fragment>Dodaj film</svelte:fragment></AddButton>
</div>

<style lang="postcss">
	.list-heading {
		margin-bottom: clamp(1.5rem, 5vw - 0.25rem, 3.313rem);

		&__title {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			font-size: clamp(2rem, 3vw + 1rem, 2.5rem);
			margin-bottom: clamp(0.75rem, 4vw - 1rem, 1.5rem);
		}

		&__description {
			font-size: clamp(1rem, 5vw - 0.75rem, 1.5rem);
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
