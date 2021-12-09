<script lang="ts" context="module">
	export const load: Load = async ({ fetch }) => {
		const { result } = await (await fetch('/api/list')).json();

		return {
			props: {
				lists: result,
			},
		};
	};
</script>

<script lang="ts">
	import type { List as ListModel } from '$lib/model/list';
	import type { Load } from '@sveltejs/kit';
	import type { ListToDisplay } from '$lib/model/listToDisplay';

	import AddListButton from '$lib/components/AddListButton.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import List from '$lib/components/List.svelte';
	import { tick } from 'svelte';

	export let lists: Array<ListModel>;

	let listsToDisplay: Array<ListToDisplay> = lists.map(({ name, id, description }) => ({
		name,
		id,
		description,
	}));

	const createList = async ({ detail }: CustomEvent<Omit<ListToDisplay, 'id'>>) => {
		const { listId } = await (
			await fetch('/api/list/create', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(detail),
			})
		).json();

		listsToDisplay[listsToDisplay.length - 1].id = listId;
	};

	const removeList = async ({ detail: id }: CustomEvent<number>) => {
		const params = new URLSearchParams({ id: id.toString() });

		await fetch(`/api/list/remove?${params}`, { method: 'delete' });
		listsToDisplay = listsToDisplay.filter(({ id: idToRemove }) => id !== idToRemove);
	};

	const scrollToBottomAfterDomUpdate = async () => {
		await tick();
		scrollTo({ top: window.innerHeight, behavior: 'smooth' });
	};

	const addList = async () => {
		if (listsToDisplay.length !== 0 && !listsToDisplay[listsToDisplay.length - 1].id) {
			scrollToBottomAfterDomUpdate();
			return;
		}

		listsToDisplay = [
			...listsToDisplay,
			{
				name: 'Nazwa',
				description: 'Opis',
			},
		];

		scrollToBottomAfterDomUpdate();
	};
</script>

<Meta title="Twoje listy" />

<div class="lists-heading">
	<h1 class="lists-heading__title">
		Twoje listy ({listsToDisplay.filter(({ id }) => typeof id === 'number').length})
	</h1>
	<div class="lists-heading__button-container--desktop">
		<AddListButton on:click={addList} />
	</div>
</div>

<section class="lists">
	{#each listsToDisplay as list (list)}
		<List on:add={createList} on:remove={removeList} {list} />
	{:else}
		<p class="lists__disclaimer">Nie masz jeszcze żadnej listy, utwórz swoją pierwszą</p>
	{/each}
</section>

<div class="lists-heading__button-container--mobile">
	<AddListButton on:click={addList} />
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

	.lists {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		gap: clamp(1rem, 7vw - 1rem, 3.875rem);

		@media screen and (min-width: 768px) {
			margin-bottom: 0;
		}

		&__disclaimer {
			text-align: center;
			color: var(--primary-accent-font);
			font-size: clamp(1rem, 1vw + 0.75rem, 1.5rem);
		}
	}
</style>
