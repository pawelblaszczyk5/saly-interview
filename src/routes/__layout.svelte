<script lang="ts" context="module">
	export const load: Load = async ({ fetch }) => {
		const anyListCreated: boolean = await (await fetch('/api/list/exists')).json();

		return {
			props: {
				anyListCreated,
			},
		};
	};
</script>

<script lang="ts">
	import type { Load } from '@sveltejs/kit';

	import '@fontsource/roboto';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/poppins/600.css';
	import 'modern-normalize';

	import '../app.postcss';
	import Logo from '$lib/components/icons/Logo.svelte';
	import Add from '$lib/components/icons/Add.svelte';
	import List from '$lib/components/icons/List.svelte';
	import { page } from '$app/stores';

	export let anyListCreated: boolean;
</script>

<header class="header">
	<a class="header__logo" href="/" title="Strona główna" sveltekit:prefetch>
		<Logo />
	</a>
	{#if $page.path !== '/lists'}
		<a class="header__anchor" href="/lists" sveltekit:prefetch>
			<span class="header__anchor-icon-container">
				{#if anyListCreated}
					<List />
				{:else}
					<Add />
				{/if}
			</span>
			{anyListCreated ? 'Twoje listy' : 'Utwórz własną listę'}
		</a>
	{/if}
</header>

<main class="main">
	<slot />
</main>

<style lang="postcss">
	* {
		--content-side-padding: clamp(1rem, 10vw - 1rem, 7.25rem);
	}
	.header {
		padding: clamp(1.5rem, 2vw + 1rem, 2.5rem) var(--content-side-padding);
		background-color: #eeeef0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 2;

		&__logo {
			display: flex;
			width: clamp(1.625rem, 5vw - 0.5rem, 3.75rem);
		}

		&__anchor {
			display: flex;
			align-items: center;
			text-decoration: none;
			gap: 1rem;
			font-size: clamp(1.25rem, 2vw + 0.75rem, 2rem);
			color: var(--primary-main-font);
		}

		&__anchor-icon-container {
			height: 100%;
			display: flex;
			align-items: center;
			width: clamp(1rem, 2vw + 0.5rem, 2rem);
		}
	}

	.main {
		padding: clamp(1rem, 10vw - 1.5rem, 4.75rem) var(--content-side-padding);
	}
</style>
