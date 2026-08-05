<script lang="ts">
	import { Search, X } from '@lucide/svelte';
	import { Input } from '$lib/components/atoms/Input/index.js';
	import { SEARCH_CLEAR_ICON_SIZE_PX, SEARCH_ICON_SIZE_PX } from '$lib/features/schools/constants';
	import { cn } from '$lib/utils/cn';

	export interface SearchBarProps {
		value: string;
		placeholder?: string;
		onValueChange: (value: string) => void;
	}

	let { value, placeholder = 'Search…', onValueChange }: SearchBarProps = $props();

	let searchInputElement = $state<HTMLInputElement | null>(null);

	const hasQuery = $derived<boolean>(Boolean(value));

	function handleClear(): void {
		onValueChange('');
		searchInputElement?.focus();
	}

	function getSearchValue(): string {
		return value;
	}

	function setSearchValue(nextValue: string): void {
		onValueChange(nextValue);
	}
</script>

<div class="relative w-full min-w-0">
	<span
		aria-hidden="true"
		class={cn(
			'pointer-events-none absolute top-1/2 left-2.5 z-10 -translate-y-1/2',
			'text-muted-foreground flex'
		)}
	>
		<Search size={SEARCH_ICON_SIZE_PX} aria-hidden="true" />
	</span>

	<Input
		bind:ref={searchInputElement}
		type="search"
		bind:value={getSearchValue, setSearchValue}
		{placeholder}
		aria-label={placeholder}
		class={cn(
			'font-body bg-card h-10 rounded border-[1.5px] py-0 pr-3 pl-9 shadow-none',
			'[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
			'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
			hasQuery && 'pr-9'
		)}
	/>

	{#if hasQuery}
		<button
			type="button"
			aria-label="Clear search"
			onclick={handleClear}
			class={cn(
				'absolute top-1/2 right-2 z-10 -translate-y-1/2',
				'flex size-6 items-center justify-center rounded',
				'text-muted-foreground',
				'transition-colors duration-200 motion-reduce:transition-none',
				'hover:bg-muted hover:text-foreground',
				'focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2'
			)}
		>
			<X size={SEARCH_CLEAR_ICON_SIZE_PX} aria-hidden="true" />
		</button>
	{/if}
</div>
