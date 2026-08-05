import { type VariantProps, tv } from 'tailwind-variants';

export const badgeVariants = tv({
	base: 'font-body inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm px-2 text-xs font-medium tracking-[0.02em] whitespace-nowrap',
	variants: {
		variant: {
			default: 'bg-muted text-foreground',
			primary: 'bg-navy-100 text-navy-700',
			success: 'bg-success-100 text-success-600',
			warning: 'bg-warning-100 text-warning-600',
			danger: 'bg-danger-100 text-danger-600'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
