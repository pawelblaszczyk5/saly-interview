<script lang="ts">
	export let title = '';
	export let description =
		'Strona do przeglądania bazę filmów za pośrednictwem The Movie Database API oraz tworzenia i zarządzania własnymi listami filmów';
</script>

<svelte:head>
	<title>Baza filmów{title && ` - ${title}`}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta name="og:description" content={description} />
</svelte:head>
