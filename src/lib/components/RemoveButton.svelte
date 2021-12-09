<script>
	import Trash from '$lib/components/icons/Trash.svelte';
</script>

<button class="remove-button" aria-label="Usuń" on:click>
	<Trash />
</button>

<style lang="postcss">
	.remove-button {
		background: none;
		border: none;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.625rem 0.75rem;
	}
</style>
