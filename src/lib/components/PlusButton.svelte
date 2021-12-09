<script>
	import Add from '$lib/components/icons/Add.svelte';
</script>

<button class="plus-button" aria-label="Dodaj" on:click>
	<Add />
</button>

<style lang="postcss">
	.plus-button {
		background: none;
		border: none;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.625rem 0.75rem;
	}
</style>
