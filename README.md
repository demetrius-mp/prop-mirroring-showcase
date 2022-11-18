# prop mirroring

open [Input.svelte](src/lib/components/Input.svelte).

The downside is you have to declare the props exported with `export let` again on the `$$Props`.

also, notice that since my `$$Props` extends from the `input` element, i use the `$$restProps` variable on the input component.
