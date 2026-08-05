import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '$lib/utils/index.js';
import type { BadgeVariant } from './badgeVariants.js';

export interface BadgeProps extends WithElementRef<HTMLAttributes<HTMLSpanElement>> {
	variant?: BadgeVariant;
	dot?: boolean;
	children?: Snippet;
}
