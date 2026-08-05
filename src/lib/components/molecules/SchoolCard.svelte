<script lang="ts">
	import { Building2, Mail, MapPin, Phone, User } from '@lucide/svelte';
	import { Badge } from '$lib/components/atoms/Badge/index.js';
	import * as Card from '$lib/components/atoms/Card/index.js';
	import {
		SCHOOL_STATUS_LABELS,
		SCHOOL_TYPE_BADGE_VARIANT,
		SCHOOL_TYPE_LABELS
	} from '$lib/features/schools/constants';
	import type { School } from '$lib/types/School';
	import { cn } from '$lib/utils/cn';
	import { formatPhone } from '$lib/utils/formatPhone';

	export interface SchoolCardProps {
		school: School;
	}

	const SCHOOL_CARD_ICON_SIZE_PX = 16;

	let { school }: SchoolCardProps = $props();

	const typeBadgeVariant = $derived(SCHOOL_TYPE_BADGE_VARIANT[school.type]);
	const statusBadgeVariant = $derived(school.status === 'active' ? 'success' : 'danger');
</script>

<Card.Root
	class={cn(
		'border-border bg-card w-full gap-0 overflow-hidden rounded-md border py-0 shadow-(--shadow-sm) ring-0'
	)}
	aria-labelledby="school-detail-heading"
>
	<Card.Header class={cn('border-border gap-4 rounded-none border-b px-4 py-5 sm:px-6')}>
		<div class="flex min-w-0 flex-wrap items-start justify-between gap-3">
			<div class="min-w-0">
				<h1
					id="school-detail-heading"
					class={cn('font-heading text-navy-800 text-xl font-bold tracking-[-0.02em] sm:text-2xl')}
				>
					{school.name}
				</h1>
				<Card.Description class={cn('font-body text-muted-foreground mt-1 text-sm')}>
					{school.address} — {school.neighborhood}, {school.city}
				</Card.Description>
			</div>
			<div class="flex shrink-0 flex-wrap gap-2">
				<Badge variant={typeBadgeVariant}>{SCHOOL_TYPE_LABELS[school.type]}</Badge>
				<Badge variant={statusBadgeVariant}>{SCHOOL_STATUS_LABELS[school.status]}</Badge>
			</div>
		</div>
	</Card.Header>

	<Card.Content class={cn('px-4 py-5 sm:px-6')}>
		<dl class={cn('grid gap-4 sm:grid-cols-2')}>
			<div class="flex min-w-0 items-start gap-3">
				<span
					class={cn(
						'bg-navy-50 text-navy-700 flex size-9 shrink-0 items-center justify-center rounded-full'
					)}
					aria-hidden="true"
				>
					<User size={SCHOOL_CARD_ICON_SIZE_PX} />
				</span>
				<div class="min-w-0">
					<dt class={cn('font-body text-muted-foreground text-xs tracking-[0.06em] uppercase')}>
						Principal
					</dt>
					<dd class={cn('font-body text-foreground mt-0.5 text-sm font-medium')}>
						{school.principal}
					</dd>
				</div>
			</div>

			<div class="flex min-w-0 items-start gap-3">
				<span
					class={cn(
						'bg-navy-50 text-navy-700 flex size-9 shrink-0 items-center justify-center rounded-full'
					)}
					aria-hidden="true"
				>
					<Phone size={SCHOOL_CARD_ICON_SIZE_PX} />
				</span>
				<div class="min-w-0">
					<dt class={cn('font-body text-muted-foreground text-xs tracking-[0.06em] uppercase')}>
						Phone
					</dt>
					<dd class={cn('font-body text-foreground mt-0.5 text-sm font-medium')}>
						{#if school.phone}
							{formatPhone(school.phone)}
						{:else}
							—
						{/if}
					</dd>
				</div>
			</div>

			<div class="flex min-w-0 items-start gap-3">
				<span
					class={cn(
						'bg-navy-50 text-navy-700 flex size-9 shrink-0 items-center justify-center rounded-full'
					)}
					aria-hidden="true"
				>
					<Mail size={SCHOOL_CARD_ICON_SIZE_PX} />
				</span>
				<div class="min-w-0">
					<dt class={cn('font-body text-muted-foreground text-xs tracking-[0.06em] uppercase')}>
						Email
					</dt>
					<dd class={cn('font-body text-foreground mt-0.5 truncate text-sm font-medium')}>
						{#if school.email}
							{school.email}
						{:else}
							—
						{/if}
					</dd>
				</div>
			</div>

			<div class="flex min-w-0 items-start gap-3">
				<span
					class={cn(
						'bg-navy-50 text-navy-700 flex size-9 shrink-0 items-center justify-center rounded-full'
					)}
					aria-hidden="true"
				>
					<MapPin size={SCHOOL_CARD_ICON_SIZE_PX} />
				</span>
				<div class="min-w-0">
					<dt class={cn('font-body text-muted-foreground text-xs tracking-[0.06em] uppercase')}>
						Location
					</dt>
					<dd class={cn('font-body text-foreground mt-0.5 text-sm font-medium')}>
						{school.neighborhood}, {school.city}
					</dd>
				</div>
			</div>

			<div class="flex min-w-0 items-start gap-3 sm:col-span-2">
				<span
					class={cn(
						'bg-navy-50 text-navy-700 flex size-9 shrink-0 items-center justify-center rounded-full'
					)}
					aria-hidden="true"
				>
					<Building2 size={SCHOOL_CARD_ICON_SIZE_PX} />
				</span>
				<div class="min-w-0">
					<dt class={cn('font-body text-muted-foreground text-xs tracking-[0.06em] uppercase')}>
						Address
					</dt>
					<dd class={cn('font-body text-foreground mt-0.5 text-sm font-medium')}>
						{school.address}
					</dd>
				</div>
			</div>
		</dl>
	</Card.Content>
</Card.Root>
