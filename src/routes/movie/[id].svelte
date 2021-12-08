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
	import type { MovieCreditsResponse } from '$lib/model/movieCreditsResponse';
	import type { MovieDetailsResponse } from '$lib/model/movieDetailsResponse';
	import type { Load } from '@sveltejs/kit';

	export let credits: MovieCreditsResponse;
	export let details: MovieDetailsResponse;
</script>

<h1>Test</h1>

<pre>
  {JSON.stringify(credits, null, 2)}
</pre>
<pre>
  {JSON.stringify(details, null, 2)}
</pre>
