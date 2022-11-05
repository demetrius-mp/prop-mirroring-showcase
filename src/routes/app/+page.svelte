<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>App</title>
</svelte:head>
<h1>Hello {$page.data.user?.name}!</h1>
