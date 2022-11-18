# prop mirroring

open [Input.svelte](src/lib/components/Input.svelte).

The downside is you have to declare the props exported with `export let` again on the `$$Props`.

also, notice that since my `$$Props` extends from the `input` element, i use the `$$restProps` variable on the input component.

Open [sign in route file](src/routes/sign-in/+page.svelte). before trying to add a prop, press `ctrl + space` to show hints. it will hint everything defined under `$$Props`, plus the mirrored props from the input element.
