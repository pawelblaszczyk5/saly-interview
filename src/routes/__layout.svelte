<script lang="ts" context="module">
	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/lists/exists');

		if (response.ok) {
			const responseBody = await response.json();

			return {
				props: {
					anyListCreated: responseBody,
				},
			};
		}
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

	export let anyListCreated: boolean;
</script>

<header class="layout__header">{anyListCreated}</header>

<main>
	<slot />
</main>

<style lang="postcss">
	.layout {
		&__header {
			height: 125px;
		}
	}
</style>
