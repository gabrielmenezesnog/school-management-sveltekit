<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

	type SingleSelectRootProps = Extract<SelectPrimitive.RootProps, { type: 'single' }>;

	let {
		open = $bindable(false),
		value = $bindable(''),
		type = 'single',
		...restProps
	}: SingleSelectRootProps = $props();
</script>

<SelectPrimitive.Root {type} bind:open bind:value {...restProps} />
