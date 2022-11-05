<script>
	import '../app.postcss';
</script>

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl"> Home </a>
	</div>
	<div class="flex-none gap-2">
		<a href="/sign-in" class="btn btn-primary"> Sign In </a>
	</div>
</div>

<div class="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl">
		<slot />
	</div>
</div>
