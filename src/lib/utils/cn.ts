import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T extends object> = Omit<T, 'child'>;

export type WithoutChildren<T extends object> = Omit<T, 'children'>;

export type WithoutChildrenOrChild<T extends object> = Omit<T, 'children' | 'child'>;

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};
