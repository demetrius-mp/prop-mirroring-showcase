<script lang="ts">
	import FormErrors from '$lib/components/FormErrors.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<FormErrors errors={form?._errors} />

<form method="post" class="flex flex-col gap-2 mt-3">
	<Input
		required
		errors={form?.email?._errors}
		name="email"
		type="email"
		label="Email"
		placeholder="my@email.com"
	/>

	<Input
		required
		minlength={8}
		errors={form?.password?._errors}
		name="password"
		type="password"
		label="Password"
		placeholder="********"
	/>

	<span>
		Don't have an account?
		<a href="/sign-up" class="link"> Sign up instead </a>
	</span>

	<button class="btn btn-primary"> submit </button>
</form>
