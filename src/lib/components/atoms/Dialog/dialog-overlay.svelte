<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/index.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	data-slot="dialog-overlay"
	class={cn(
		'z-modal fixed inset-0 isolate',
		'bg-[oklch(0%_0_0_/_0.45)] supports-backdrop-filter:backdrop-blur-[4px]',
		'duration-100',
		'data-open:animate-in data-open:fade-in-0',
		'data-closed:animate-out data-closed:fade-out-0',
		className
	)}
	{...restProps}
/>
