<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<form method="post" class="flex flex-col gap-2">
	<Input
		errors={form?.email?._errors}
		name="email"
		type="email"
		label="Email"
		placeholder="my@email.com"
	/>

	<Input
		errors={form?.password?._errors}
		name="password"
		type="password"
		label="Password"
		placeholder="********"
	/>

	<button class="btn btn-primary"> submit </button>
</form>
