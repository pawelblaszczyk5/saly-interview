<script lang="ts">
	import Add from '$lib/components/icons/Add.svelte';
</script>

<button class="add-list-button" on:click>
	<span class="add-list-button__icon-container"><Add /></span> Utwórz własną listę
</button>

<style lang="postcss">
	.add-list-button {
		background: none;
		border: none;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: clamp(1.25rem, 2vw + 0.75rem, 2rem);

		&__icon-container {
			height: 100%;
			display: flex;
			align-items: center;
			width: clamp(1rem, 2vw + 0.5rem, 2rem);
		}
	}
</style>
