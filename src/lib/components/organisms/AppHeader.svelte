<script lang="ts">
	import { School } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import {
		APP_BRAND_NAME,
		APP_HEADER_LOGO_ICON_SIZE_PX,
		SCHOOLS_NAV_LABEL
	} from '$lib/constants/appHeader';
	import { SCHOOLS_ROUTE } from '$lib/constants/routes';
	import { cn } from '$lib/utils/cn';

	export interface AppHeaderProps {
		isSchoolsNavActive: boolean;
	}

	let { isSchoolsNavActive }: AppHeaderProps = $props();

	const schoolsHref = resolve(SCHOOLS_ROUTE);
</script>

<header class={cn('z-header sticky top-0', 'bg-navy-800 shadow-(--header-shadow)')}>
	<div class={cn('mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:gap-8 sm:px-6')}>
		<a
			href={schoolsHref}
			aria-label="{APP_BRAND_NAME} home"
			class={cn(
				'flex min-w-0 items-center gap-2',
				'text-inherit no-underline',
				'focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ring)'
			)}
		>
			<span
				aria-hidden="true"
				class={cn(
					'flex size-8 shrink-0 items-center justify-center',
					'rounded bg-indigo-500 text-white'
				)}
			>
				<School size={APP_HEADER_LOGO_ICON_SIZE_PX} aria-hidden="true" />
			</span>
			<span class={cn('font-heading truncate text-base font-bold sm:text-lg', 'text-white')}>
				{APP_BRAND_NAME}
			</span>
		</a>

		<nav
			class={cn('flex shrink-0 items-center gap-4 sm:gap-5', 'max-sm:ml-auto')}
			aria-label="Primary"
		>
			<a
				href={schoolsHref}
				aria-current={isSchoolsNavActive ? 'page' : undefined}
				class={cn(
					'cursor-pointer border-b-2 border-transparent bg-transparent py-1 no-underline',
					'font-heading text-[0.8125rem] font-medium text-white/80',
					'transition-colors duration-200 motion-reduce:transition-none',
					'hover:text-white',
					'focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ring)',
					isSchoolsNavActive && 'border-indigo-400 text-white'
				)}
			>
				{SCHOOLS_NAV_LABEL}
			</a>
		</nav>

		<div class={cn('flex-1', 'max-sm:hidden')}></div>

		<span class={cn('font-body text-navy-200 text-xs tracking-[0.04em]', 'max-sm:hidden')}>
			Municipal School Management
		</span>
	</div>
</header>
