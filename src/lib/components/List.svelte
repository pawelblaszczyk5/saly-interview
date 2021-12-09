<script lang="ts">
	import type { ListToDisplay } from '$lib/model/listToDisplay';

	import RemoveButton from '$lib/components/RemoveButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import Add from '$lib/components/icons/Add.svelte';

	export let list: ListToDisplay;

	const dispatch = createEventDispatcher<{ add: Omit<ListToDisplay, 'id'>; remove: number }>();

	const remove = () => {
		dispatch('remove', list.id);
	};

	const add = () => {
		dispatch('add', { description: list.description, name: list.name });
	};
</script>

<article class="list">
	{#if list.id}
		<a class="list__anchor" href={list.id ? `/list/${list.id}` : undefined} sveltekit:prefetch>
			<h1 class="list__anchor-title">{list.name}</h1>
		</a>
		<p class="list__description">{list.description}</p>
		<div class="list__button">
			<RemoveButton on:click={remove} />
		</div>
	{:else}
		<form class="list__form" on:submit|preventDefault={add}>
			<input class="list__title" bind:value={list.name} required />
			<input class="list__description-input" bind:value={list.description} required />
			<button class="list__button list__button--add" type="submit" aria-label="Dodaj">
				<Add />
			</button>
		</form>
	{/if}
</article>

<style lang="postcss">
	.list {
		box-shadow: var(--primary-box-shadow);
		padding: clamp(1.5rem, 5vw + 0.25rem, 3.5rem) clamp(1.5rem, 5vw + 0.25rem, 3rem);
		min-height: clamp(12.5rem, 30vw + 3rem, 23.063rem);
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: clamp(0.5rem, 4vw - 1rem, 2rem);
		position: relative;

		&__anchor {
			color: inherit;
			font-weight: 500;
			text-decoration: none;
		}

		&__anchor-title {
			font-size: clamp(1.5rem, 5vw + 0.25rem, 3rem);
			padding-right: 3rem;
		}

		&__description {
			font-size: clamp(1rem, 5vw - 0.75rem, 1.5rem);
		}

		&__button {
			position: absolute;
			top: clamp(0.75rem, 5vw - 1rem, 2.25rem);
			right: clamp(0.75rem, 5vw - 1rem, 2.25rem);

			&--add {
				background: none;
				border: none;
				width: 2.5rem;
				height: 2.5rem;
				padding: 0.625rem 0.75rem;
			}
		}

		&__form {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: flex-start;
			flex-direction: column;
			gap: clamp(0.5rem, 4vw - 1rem, 2rem);
		}

		&__title {
			font-size: clamp(1.5rem, 5vw + 0.25rem, 3rem);
			width: calc(100% - 3rem);
			padding: 0.25rem 0.5rem;
			border: 1px solid var(--primary-accent-background);
		}

		&__description-input {
			width: 100%;
			padding: 0.25rem 0.5rem;
			border: 1px solid var(--primary-accent-background);
			font-size: clamp(1rem, 5vw - 0.75rem, 1.5rem);
			line-height: 1.15;
		}
	}
</style>
