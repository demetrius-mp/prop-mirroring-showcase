<script lang="ts">
	interface $$Props extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['input']> {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	let klass = '';
	export { klass as class };
</script>

<div>
	<label for={name} class="label">
		<span class="label-text">
			<slot name="label">
				{label}
			</slot>
		</span>
	</label>

	<input
		{name}
		class:input-error={errors}
		class="input input-bordered w-full {klass}"
		{...$$restProps}
	/>

	{#if errors !== undefined && errors.length > 0}
		<label for={name} class="label">
			<span class="label-text-alt text-error flex flex-col">
				{#each errors as error}
					<span>
						{error}
					</span>
				{/each}
			</span>
		</label>
	{/if}
</div>
