<script lang="ts">
	import { badgeVariants } from './badgeVariants.js';
	import type { BadgeProps } from './badgeProps.js';
	import { cn } from '$lib/utils/index.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		dot = false,
		children,
		...restProps
	}: BadgeProps = $props();
</script>

<span
	bind:this={ref}
	data-slot="badge"
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{#if dot}
		<span
			aria-hidden="true"
			class={cn(
				'size-1 shrink-0 rounded-full',
				variant === 'primary' && 'bg-navy-700',
				variant === 'success' && 'bg-success-600',
				variant === 'warning' && 'bg-warning-600',
				variant === 'danger' && 'bg-danger-600',
				variant === 'default' && 'bg-foreground'
			)}
		></span>
	{/if}
	{@render children?.()}
</span>
