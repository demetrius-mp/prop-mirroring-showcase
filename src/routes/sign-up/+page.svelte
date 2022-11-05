<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<form method="post" class="flex flex-col gap-2">
	<Input
		required
		minlength={3}
		errors={form?.name?._errors}
		name="name"
		type="text"
		label="Name"
		placeholder="John Doe"
	/>

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

	<Input
		required
		minlength={8}
		errors={form?.confirmPassword?._errors}
		name="confirmPassword"
		type="password"
		label="Confirm password"
		placeholder="********"
	/>

	<span>
		Already have an account?
		<a href="/sign-in" class="link"> Sign in instead </a>
	</span>

	<button class="btn btn-primary"> submit </button>
</form>
