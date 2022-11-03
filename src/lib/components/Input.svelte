<script lang="ts">
	type HTMLInputType =
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';

	export let name: string;
	export let label: string | null = null;
	export let errors: string[] | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let type: HTMLInputType;

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
		{type}
		{placeholder}
		class:input-error={errors}
		class="input input-bordered w-full {klass}"
	/>

	{#if errors}
		<label for={name} class="label">
			{#each errors as error}
				<span class="label-text-alt text-error">
					{error}
				</span>
			{/each}
		</label>
	{/if}
</div>
