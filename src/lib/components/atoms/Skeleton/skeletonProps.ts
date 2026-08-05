import type { HTMLAttributes } from 'svelte/elements';
import { type WithElementRef, type WithoutChildren } from '$lib/utils/index.js';

export type SkeletonProps = WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>>;
