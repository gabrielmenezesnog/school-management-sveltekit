<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded whitespace-nowrap outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: 'btn-primary',
				secondary: 'btn-secondary',
				ghost: 'btn-ghost',
				destructive: 'btn-destructive'
			},
			size: {
				default: 'h-10 px-4 text-sm',
				sm: 'h-8 gap-1.5 px-3 text-[0.8125rem]',
				lg: 'h-12 px-5 text-[0.9375rem]',
				icon: 'size-10',
				'icon-sm': 'size-8'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};
</script>

<script lang="ts">
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
