<script lang="ts">
	// import '@fontsource/roboto';
	// import '@fontsource/roboto/500.css';
	// import '@fontsource/roboto/700.css';
	import '@fontsource/poppins/600.css';
	import 'modern-normalize';

	import '../app.postcss';
</script>

<header class="layout__header">Hello</header>

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
