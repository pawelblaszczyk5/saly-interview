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
	export let list: ListResponse;
</script>

<h1>Hello</h1>

<pre>
  {JSON.stringify(list, null, 2)}
</pre>
