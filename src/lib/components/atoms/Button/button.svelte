<script lang="ts">
	import { cn } from '$lib/utils/index.js';
	import { buttonVariants, type ButtonProps } from './buttonVariants.js';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<button
	bind:this={ref}
	data-slot="button"
	class={cn(buttonVariants({ variant, size }), className)}
	{type}
	{disabled}
	{...restProps}
>
	{@render children?.()}
</button>
