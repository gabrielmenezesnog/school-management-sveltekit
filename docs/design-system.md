# Design System — School Management

A civic-grade design system for the school/class management app. Built on Tailwind CSS v4 + shadcn-svelte. Stance: **Swiss precision** — strict grid, deep navy primary, one vibrant accent, clean hierarchy with no decorative noise.

---

## 1. Typography

### Font Families

| Role                   | Family             | Source       |
| ---------------------- | ------------------ | ------------ |
| Display & headings     | **Poppins**        | Google Fonts |
| Body, labels, captions | **Roboto**         | Google Fonts |
| Tabular data / mono    | **JetBrains Mono** | Google Fonts |

### Import (CSS entrypoint — before all other statements)

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

### Scale

| Token     | Family         | Size             | Weight | Line Height | Use                        |
| --------- | -------------- | ---------------- | ------ | ----------- | -------------------------- |
| `display` | Poppins        | 2.5rem (40px)    | 800    | 1.1         | Page hero titles           |
| `h1`      | Poppins        | 2rem (32px)      | 700    | 1.2         | Page headings              |
| `h2`      | Poppins        | 1.5rem (24px)    | 600    | 1.3         | Section headings           |
| `h3`      | Poppins        | 1.125rem (18px)  | 600    | 1.4         | Card headings, subgroups   |
| `h4`      | Poppins        | 1rem (16px)      | 600    | 1.4         | Label headings             |
| `body-lg` | Roboto         | 1rem (16px)      | 400    | 1.6         | Main body copy             |
| `body`    | Roboto         | 0.875rem (14px)  | 400    | 1.6         | Default body text          |
| `body-sm` | Roboto         | 0.8125rem (13px) | 400    | 1.5         | Secondary info, form hints |
| `caption` | Roboto         | 0.75rem (12px)   | 400    | 1.5         | Timestamps, metadata       |
| `label`   | Roboto         | 0.75rem (12px)   | 500    | 1.4         | Form labels, chip text     |
| `mono`    | JetBrains Mono | 0.8125rem (13px) | 400    | 1.5         | IDs, codes, table cells    |
| `button`  | Poppins        | 0.875rem (14px)  | 600    | 1           | Button labels              |
| `nav`     | Poppins        | 0.8125rem (13px) | 500    | 1           | Navigation links           |

### Hierarchy Rules

- **One Poppins heading per visual section.** Never stack two consecutive Poppins headings without a body/Roboto break between them.
- Body copy is always Roboto — never Poppins in paragraph text.
- Letter-spacing on headings: `-0.02em` for h1/display, `0` for h2–h4.
- All-caps labels use `letter-spacing: 0.08em`.

---

## 2. Color System

### Palette

All colors are defined as CSS variables using OKLCH for perceptual uniformity.

```css
:root {
	/* --- Brand --- */
	--color-navy-900: oklch(18% 0.06 255);
	--color-navy-800: oklch(24% 0.07 255);
	--color-navy-700: oklch(30% 0.08 255);
	--color-navy-600: oklch(38% 0.09 255);
	--color-navy-500: oklch(46% 0.1 255);
	--color-navy-400: oklch(56% 0.09 255);
	--color-navy-300: oklch(68% 0.07 255);
	--color-navy-200: oklch(82% 0.04 255);
	--color-navy-100: oklch(93% 0.02 255);
	--color-navy-50: oklch(97% 0.01 255);

	/* --- Accent: Electric Indigo --- */
	--color-indigo-600: oklch(45% 0.22 270);
	--color-indigo-500: oklch(55% 0.24 270);
	--color-indigo-400: oklch(65% 0.22 270);
	--color-indigo-300: oklch(75% 0.18 270);
	--color-indigo-100: oklch(92% 0.06 270);
	--color-indigo-50: oklch(97% 0.02 270);

	/* --- Semantic --- */
	--color-success-600: oklch(45% 0.16 155);
	--color-success-500: oklch(55% 0.18 155);
	--color-success-100: oklch(93% 0.05 155);
	--color-warning-600: oklch(60% 0.18 70);
	--color-warning-500: oklch(70% 0.2 70);
	--color-warning-100: oklch(95% 0.06 70);
	--color-danger-600: oklch(42% 0.22 25);
	--color-danger-500: oklch(52% 0.24 25);
	--color-danger-100: oklch(94% 0.06 25);

	/* --- Neutral --- */
	--color-gray-900: oklch(16% 0.01 255);
	--color-gray-700: oklch(36% 0.01 255);
	--color-gray-500: oklch(55% 0.01 255);
	--color-gray-400: oklch(65% 0.01 255);
	--color-gray-200: oklch(88% 0.01 255);
	--color-gray-100: oklch(94% 0.01 255);
	--color-gray-50: oklch(98% 0.005 255);
	--color-white: oklch(100% 0 0);
}
```

### Semantic Design Tokens (shadcn-svelte compatible)

```css
:root {
	/* Surfaces */
	--background: var(--color-gray-50);
	--foreground: var(--color-gray-900);
	--card: var(--color-white);
	--card-foreground: var(--color-gray-900);

	/* Primary — Navy */
	--primary: var(--color-navy-800);
	--primary-foreground: var(--color-white);

	/* Secondary — Light surface */
	--secondary: var(--color-navy-100);
	--secondary-foreground: var(--color-navy-700);

	/* Muted — Subdued */
	--muted: var(--color-gray-100);
	--muted-foreground: var(--color-gray-500);

	/* Accent — Electric Indigo */
	--accent: var(--color-indigo-500);
	--accent-foreground: var(--color-white);

	/* Destructive */
	--destructive: var(--color-danger-500);
	--destructive-foreground: var(--color-white);

	/* Structure */
	--border: var(--color-gray-200);
	--input: var(--color-gray-200);
	--ring: var(--color-indigo-400);

	/* Radius */
	--radius: 0.375rem; /* 6px — flat but not sharp */
}
```

### Color Usage Rules

- **Primary (navy)** — headers, nav, table headers, primary actions.
- **Accent (indigo)** — interactive highlights, links, focus rings, gradient start.
- **Destructive (red)** — delete actions, error states only.
- **Success/Warning/Danger** — inline status badges and alert states only, never as brand color.
- Never use more than **2 brand colors** visible simultaneously on the same card/section.
- Text on colored backgrounds must always meet WCAG AA (4.5:1 for body, 3:1 for large text).

---

## 3. Spacing Scale

Built on a base-4 grid. All spacing values derive from this scale.

| Token      | Value | Common use                                |
| ---------- | ----- | ----------------------------------------- |
| `space-1`  | 4px   | Icon gap, tight inline spacing            |
| `space-2`  | 8px   | Inner padding small, chip padding         |
| `space-3`  | 12px  | Form gap, list item vertical padding      |
| `space-4`  | 16px  | Card padding (mobile), input padding      |
| `space-5`  | 20px  | Row spacing, button padding horizontal    |
| `space-6`  | 24px  | Card padding (desktop), section inner gap |
| `space-8`  | 32px  | Section spacing, modal padding            |
| `space-10` | 40px  | Page section gap                          |
| `space-12` | 48px  | Hero padding                              |
| `space-16` | 64px  | Major section dividers                    |
| `space-20` | 80px  | Page top padding                          |

---

## 4. Border Radius

User preference: **slightly rounded, not pill-shaped.**

| Token                | Value  | Use                        |
| -------------------- | ------ | -------------------------- |
| `--radius-sm`        | 4px    | Badges, chips, inner input |
| `--radius` (default) | 6px    | Buttons, inputs, cards     |
| `--radius-md`        | 8px    | Modals, panels, dropdowns  |
| `--radius-lg`        | 12px   | Large cards, page sections |
| `--radius-full`      | 9999px | Avatars only               |

```css
:root {
	--radius-sm: 0.25rem;
	--radius: 0.375rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-full: 9999px;
}
```

---

## 5. Elevation (Shadows)

Shadows should feel structural, not floating. Use sparingly.

| Level       | Value                                                               | Use                       |
| ----------- | ------------------------------------------------------------------- | ------------------------- |
| `shadow-xs` | `0 1px 2px oklch(0% 0 0 / 0.06)`                                    | Inputs on focus           |
| `shadow-sm` | `0 1px 3px oklch(0% 0 0 / 0.08), 0 1px 2px oklch(0% 0 0 / 0.06)`    | Cards resting             |
| `shadow-md` | `0 4px 6px oklch(0% 0 0 / 0.07), 0 2px 4px oklch(0% 0 0 / 0.06)`    | Dropdowns, hover cards    |
| `shadow-lg` | `0 10px 15px oklch(0% 0 0 / 0.08), 0 4px 6px oklch(0% 0 0 / 0.05)`  | Modals, drawers           |
| `shadow-xl` | `0 20px 25px oklch(0% 0 0 / 0.08), 0 8px 10px oklch(0% 0 0 / 0.04)` | Command palette, popovers |

---

## 6. Buttons

### Hierarchy

Four tiers of button importance — never mix tiers without clear intent.

| Variant         | Appearance                                    | Use                                         |
| --------------- | --------------------------------------------- | ------------------------------------------- |
| **Primary**     | Gradient fill (navy → indigo), white text     | Main action per view (Save, Create)         |
| **Secondary**   | Navy border, navy text, transparent bg        | Secondary action (Edit, Cancel with intent) |
| **Ghost**       | No border, muted text, hover reveals bg       | Tertiary/inline actions (View, Clear)       |
| **Destructive** | Gradient fill (red-700 → red-500), white text | Delete, permanently remove                  |

### Primary Button Gradient

```css
.btn-primary {
	background: linear-gradient(135deg, var(--color-navy-800) 0%, var(--color-indigo-500) 100%);
	background-size: 200% 200%;
	background-position: 0% 50%;
	transition:
		background-position 0.4s ease,
		box-shadow 0.2s ease;
}

.btn-primary:hover {
	background-position: 100% 50%;
	box-shadow: 0 4px 14px oklch(45% 0.22 270 / 0.35);
}
```

### Fill Animation (alternative to gradient — for outlined buttons)

```css
.btn-fill {
	position: relative;
	border: 1.5px solid var(--color-navy-800);
	color: var(--color-navy-800);
	background: transparent;
	overflow: hidden;
	transition: color 0.3s ease;
}

.btn-fill::before {
	content: '';
	position: absolute;
	inset: 0;
	background: var(--color-navy-800);
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 0;
}

.btn-fill:hover::before {
	transform: scaleX(1);
}

.btn-fill:hover {
	color: var(--color-white);
}

.btn-fill span {
	position: relative;
	z-index: 1;
}
```

### Sizes

| Size           | Height | Padding H | Font               | Radius |
| -------------- | ------ | --------- | ------------------ | ------ |
| `sm`           | 32px   | 12px      | 13px / Poppins 600 | 6px    |
| `md` (default) | 40px   | 16px      | 14px / Poppins 600 | 6px    |
| `lg`           | 48px   | 20px      | 15px / Poppins 600 | 6px    |

### Button States

- **Default** — defined above per variant.
- **Hover** — gradient shift or fill animation + shadow.
- **Focus-visible** — `outline: 2px solid var(--color-indigo-400); outline-offset: 2px`.
- **Active** — scale down `0.97`, shadow removed.
- **Disabled** — 40% opacity, `cursor: not-allowed`, no hover effects.
- **Loading** — replace label with a 16px spinner (Lucide `Loader2` spinning), keep button width stable.

---

## 7. Inputs & Form Fields

### Input

```
height: 40px (md) / 36px (sm)
padding: 0 12px
border: 1.5px solid var(--border)
border-radius: var(--radius)           // 6px
background: var(--card)
font: Roboto 14px / 400
color: var(--foreground)
transition: border-color 0.2s ease, box-shadow 0.2s ease
```

**Focus:** `border-color: var(--accent); box-shadow: 0 0 0 3px oklch(65% 0.22 270 / 0.15)`
**Error:** `border-color: var(--destructive); box-shadow: 0 0 0 3px oklch(52% 0.24 25 / 0.12)`
**Disabled:** `background: var(--muted); opacity: 0.6; cursor: not-allowed`

### Form Label

```
font: Roboto 12px / 500
color: var(--foreground)
letter-spacing: 0.01em
margin-bottom: 6px
```

Required asterisk: `color: var(--destructive)`, no space before it.

### Error Message

```
font: Roboto 12px / 400
color: var(--destructive)
margin-top: 4px
display: flex; align-items: center; gap: 4px
```

Prefix with Lucide `AlertCircle` (12px).

### Select

Same dimensions as input. Arrow icon: Lucide `ChevronDown` (16px, `color: var(--muted-foreground)`).

### FormField Molecule

Wraps `Label` + `Input`/`Select`/`Textarea` + optional error message. Always a `<label>` with correct `for` binding. Never raw inputs without labels.

---

## 8. Cards

```
background: var(--card)
border: 1px solid var(--border)
border-radius: var(--radius-md)       // 8px
box-shadow: var(--shadow-sm)
padding: 24px
transition: box-shadow 0.2s ease, transform 0.2s ease
```

**Hover (interactive card):** `box-shadow: var(--shadow-md); transform: translateY(-1px)`

### Card Anatomy

```
┌────────────────────────────────────────────┐
│  Card Header (Poppins h3 + optional badge) │
│  ─────────────────────────────────────────  │
│  Card Body  (Roboto body)                  │
│                                            │
│  Card Footer (right-aligned actions)       │
└────────────────────────────────────────────┘
```

---

## 9. Tables

Tables are the primary data surface for both schools and classes lists.

### Structure

```html
<table>
  <thead> → bg: var(--color-navy-50); border-bottom: 2px solid var(--border)
    <th>  → Roboto 12px / 500; letter-spacing: 0.06em; uppercase; color: var(--muted-foreground); padding: 10px 16px
  </thead>
  <tbody>
    <tr>  → border-bottom: 1px solid var(--border); transition: background 0.15s
    <tr:hover> → background: var(--color-indigo-50)
    <td>  → Roboto 14px / 400; color: var(--foreground); padding: 12px 16px
  </tbody>
</table>
```

### Table Row Actions

Row actions (Edit, Delete) appear in the last column. Use a `DropdownMenu` or inline icon buttons (Ghost size=sm). Actions only fully visible on row hover — opacity transitions from `0.4` to `1` on hover.

### Empty State

```
Centered vertically in the table body area.
Lucide icon (School or BookOpen) at 48px, color: var(--muted-foreground)
Heading: Poppins 16px / 600, color: var(--foreground)
Subtext: Roboto 14px / 400, color: var(--muted-foreground)
CTA button below (Primary size=sm)
```

---

## 10. Badges / Chips

```
height: 22px
padding: 0 8px
border-radius: var(--radius-sm)       // 4px
font: Roboto 12px / 500
letter-spacing: 0.02em
display: inline-flex; align-items: center; gap: 4px
```

| Variant   | Background                 | Text                       |
| --------- | -------------------------- | -------------------------- |
| `default` | `var(--muted)`             | `var(--foreground)`        |
| `primary` | `var(--color-navy-100)`    | `var(--color-navy-700)`    |
| `success` | `var(--color-success-100)` | `var(--color-success-600)` |
| `warning` | `var(--color-warning-100)` | `var(--color-warning-600)` |
| `danger`  | `var(--color-danger-100)`  | `var(--color-danger-600)`  |

Dot indicator (4px circle, same color as text) precedes label for status badges.

---

## 11. Confirmation Modals

Confirmation modals are a first-class UX pattern in this system. Every destructive action must route through one.

### Design

```
overlay: oklch(0% 0 0 / 0.45); backdrop-filter: blur(4px)
modal:
  width: 440px
  border-radius: var(--radius-md)     // 8px
  box-shadow: var(--shadow-xl)
  padding: 32px
  background: var(--card)
animation-in: scale(0.95) → scale(1) + opacity 0 → 1, duration 180ms, ease-out
animation-out: scale(1) → scale(0.95) + opacity 1 → 0, duration 140ms, ease-in
```

### Anatomy

```
┌──────────────────────────────────────────┐
│  [Lucide icon — 40px, danger/warning bg] │
│                                          │
│  Poppins h3: "Delete school?"            │
│  Roboto body: Precise consequence text   │
│  "This will permanently remove           │
│  Lincoln Elementary and all 4 classes."  │
│                                          │
│  [Cancel — Ghost/Secondary]  [Confirm — Destructive]│
└──────────────────────────────────────────┘
```

### Rules

- Icon background: 48px circle, `var(--color-danger-100)`, icon in `var(--danger-600)`.
- Title: precise and specific — name the entity being deleted.
- Body copy: state exact consequence — include counts when possible ("and all 4 classes").
- Buttons: Cancel on left (Ghost), Confirm on right (Destructive). Never auto-focus confirm.
- Auto-focus: the Cancel button on mount.
- Close on overlay click: **No** for destructive confirms. Yes for informational confirms.
- Close on Escape: always.

---

## 12. Toast Notifications

Using `svelte-sonner`.

| Type      | Icon                   | Color                      |
| --------- | ---------------------- | -------------------------- |
| `success` | Lucide `CheckCircle2`  | `var(--color-success-600)` |
| `error`   | Lucide `XCircle`       | `var(--color-danger-500)`  |
| `warning` | Lucide `AlertTriangle` | `var(--color-warning-600)` |
| `info`    | Lucide `Info`          | `var(--color-indigo-500)`  |

```
position: bottom-right
border-radius: var(--radius-md)
font: Roboto 14px
max-width: 380px
duration: 4000ms (success/info), 6000ms (error)
```

Message copy: always past-tense action + entity name. Example: "School created successfully." / "Failed to delete Lincoln Elementary."

---

## 13. Navigation / App Shell

### Top Header

```
height: 64px
background: var(--color-navy-800)
border-bottom: none
padding: 0 24px
layout: flex, space-between
box-shadow: 0 1px 3px oklch(0% 0 0 / 0.2)
```

- **Logo area:** App name in Poppins 18px / 700, white. Optional small school icon (Lucide `School`).
- **Nav links:** Poppins 13px / 500, white 80% opacity. Active: white 100% + 2px indigo underline.
- **Nav link hover:** white 100%, smooth `0.2s`.

### Sidebar (if used for detail views)

```
width: 240px
background: var(--color-navy-900)
padding: 16px 0
```

Nav item: `height: 40px; padding: 0 16px; border-radius: var(--radius); margin: 2px 8px`. Active: `background: var(--color-navy-700); color: white`. Hover: `background: var(--color-navy-800)`.

### Breadcrumbs

```
font: Roboto 13px / 400
color: var(--muted-foreground)
separator: Lucide ChevronRight (14px)
```

Current page segment: Roboto 13px / 500, `color: var(--foreground)`.

---

## 14. Search Bar

```
width: 320px (expandable to 400px on focus)
height: 40px
border: 1.5px solid var(--border)
border-radius: var(--radius)
padding: 0 12px 0 36px    // space for leading icon
font: Roboto 14px
transition: width 0.3s ease, border-color 0.2s ease
```

Leading icon: Lucide `Search` (16px), `color: var(--muted-foreground)`, absolutely positioned.

On focus: `border-color: var(--accent)` + expand width animation.

Clear button: Lucide `X` (14px), appears when value is non-empty, ghost button.

---

## 15. Skeleton Loading

Composed skeleton blocks — not generic spinners.

```css
.skeleton {
	background: linear-gradient(
		90deg,
		var(--color-gray-100) 25%,
		var(--color-gray-200) 50%,
		var(--color-gray-100) 75%
	);
	background-size: 200% 100%;
	animation: skeleton-shimmer 1.6s ease-in-out infinite;
	border-radius: var(--radius-sm);
}

@keyframes skeleton-shimmer {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}
```

### Skeleton Variants

| Name                   | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `SchoolsTableSkeleton` | 5 rows × table columns. Match actual column widths.     |
| `SchoolCardSkeleton`   | Header line (60%), 2 body lines (80%, 45%), action row. |
| `ClassesTableSkeleton` | 4 rows × class columns.                                 |
| `FormSkeleton`         | 3 field blocks (label + input height stacked).          |

Rule: skeleton dimensions must match the real content shape — no layout jump on data arrival.

---

## 16. Animations & Transitions

All transitions use these curves:

| Name            | Value                               | Use                                         |
| --------------- | ----------------------------------- | ------------------------------------------- |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)`      | Default state transitions                   |
| `ease-enter`    | `cubic-bezier(0, 0, 0.2, 1)`        | Elements entering (modal in, dropdown open) |
| `ease-exit`     | `cubic-bezier(0.4, 0, 1, 1)`        | Elements leaving (modal out, toast dismiss) |
| `ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions (button press, icon pop) |

### Duration Scale

| Level     | Duration | Use                                   |
| --------- | -------- | ------------------------------------- |
| `instant` | 50ms     | Color, opacity micro-changes          |
| `fast`    | 120ms    | Icon swaps, badge appearance          |
| `normal`  | 200ms    | Most hover states                     |
| `enter`   | 180ms    | Panel / modal appear                  |
| `exit`    | 140ms    | Panel / modal disappear               |
| `slow`    | 350ms    | Page transitions, large layout shifts |

### Page Transitions

Route entry: fade + translate Y from `4px` to `0`, 200ms, `ease-enter`.

```css
.page-enter {
	animation: page-enter 200ms cubic-bezier(0, 0, 0.2, 1) both;
}

@keyframes page-enter {
	from {
		opacity: 0;
		transform: translateY(4px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
```

### List Item Stagger

When a list renders for the first time (not on every update), stagger items with 30ms delay per item, max 5 items staggered.

```css
.list-item:nth-child(1) {
	animation-delay: 0ms;
}
.list-item:nth-child(2) {
	animation-delay: 30ms;
}
.list-item:nth-child(3) {
	animation-delay: 60ms;
}
.list-item:nth-child(4) {
	animation-delay: 90ms;
}
.list-item:nth-child(5) {
	animation-delay: 120ms;
}
```

### Interaction Micro-animations

- **Button press:** `transform: scale(0.97)` on `:active`, 80ms.
- **Row hover:** background transition 150ms, row expand of 0px (no height shift).
- **Modal overlay:** blur animates from `0px` to `4px` over 200ms.
- **Badge enter:** `transform: scale(0.8) → 1`, opacity `0 → 1`, 120ms spring.
- **Toast enter:** slide in from right + fade, 200ms enter. Dismiss: slide out right + fade, 150ms.
- **Form error appear:** height expand + fade in, 200ms.
- **Delete row:** fade to `opacity: 0.4` + strike-through, then remove from list after 300ms.

---

## 17. Accessibility (WCAG AA)

| Concern                    | Implementation                                                     |
| -------------------------- | ------------------------------------------------------------------ |
| Contrast — body text       | Navy 800 on white: 13.8:1 ✓                                        |
| Contrast — muted text      | Gray 500 on white: 4.7:1 ✓                                         |
| Contrast — accent on white | Indigo 500 on white: 4.9:1 ✓                                       |
| Focus rings                | 2px indigo-400, offset 2px — all interactive elements              |
| Keyboard nav               | Tab order follows visual order; no `tabindex > 0`                  |
| Skip link                  | `#main-content` skip link at top of layout                         |
| Screen reader              | Modals use `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Form errors                | `aria-describedby` links input to error message id                 |
| Loading states             | `aria-busy="true"` on table container during skeleton phase        |
| Icon buttons               | Always `aria-label` when no visible text                           |
| Status badges              | Text + color (never color alone)                                   |
| Toasts                     | `aria-live="polite"` for success/info; `role="alert"` for errors   |

---

## 18. Layout Grid

### Page Layout

```
max-width: 1280px
margin: 0 auto
padding: 0 24px (mobile: 0 16px)
```

### Content Grid

```css
.page-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;
}

@media (min-width: 1000px) {
	.page-detail-grid {
		grid-template-columns: 2fr 1fr;
	}
}
```

### Breakpoints

| Name | Min-width | Context                     |
| ---- | --------- | --------------------------- |
| `sm` | 640px     | Mobile adjustments          |
| `md` | 768px     | Table layout                |
| `lg` | 1000px    | Two-column layouts, sidebar |
| `xl` | 1280px    | Max content width           |

---

## 19. Tailwind CSS v4 Theme Integration

In `src/app.css` (SvelteKit) or `src/index.css` (Vite), declare the tokens inside `@theme`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

@import 'tailwindcss';

@theme {
	--font-heading: 'Poppins', sans-serif;
	--font-body: 'Roboto', sans-serif;
	--font-mono: 'JetBrains Mono', monospace;

	--radius-sm: 0.25rem;
	--radius: 0.375rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-full: 9999px;

	--color-navy-50: oklch(97% 0.01 255);
	--color-navy-100: oklch(93% 0.02 255);
	--color-navy-200: oklch(82% 0.04 255);
	--color-navy-300: oklch(68% 0.07 255);
	--color-navy-400: oklch(56% 0.09 255);
	--color-navy-500: oklch(46% 0.1 255);
	--color-navy-600: oklch(38% 0.09 255);
	--color-navy-700: oklch(30% 0.08 255);
	--color-navy-800: oklch(24% 0.07 255);
	--color-navy-900: oklch(18% 0.06 255);

	--color-indigo-50: oklch(97% 0.02 270);
	--color-indigo-100: oklch(92% 0.06 270);
	--color-indigo-300: oklch(75% 0.18 270);
	--color-indigo-400: oklch(65% 0.22 270);
	--color-indigo-500: oklch(55% 0.24 270);
	--color-indigo-600: oklch(45% 0.22 270);
}

:root {
	--background: oklch(98% 0.005 255);
	--foreground: oklch(16% 0.01 255);
	--card: oklch(100% 0 0);
	--card-foreground: oklch(16% 0.01 255);
	--primary: oklch(24% 0.07 255);
	--primary-foreground: oklch(100% 0 0);
	--secondary: oklch(93% 0.02 255);
	--secondary-foreground: oklch(30% 0.08 255);
	--muted: oklch(94% 0.01 255);
	--muted-foreground: oklch(55% 0.01 255);
	--accent: oklch(55% 0.24 270);
	--accent-foreground: oklch(100% 0 0);
	--destructive: oklch(52% 0.24 25);
	--destructive-foreground: oklch(100% 0 0);
	--border: oklch(88% 0.01 255);
	--input: oklch(88% 0.01 255);
	--ring: oklch(65% 0.22 270);
	--radius: 0.375rem;
}
```

---

## 20. Component Quick Reference

| Component              | Layer    | File                                               |
| ---------------------- | -------- | -------------------------------------------------- |
| `Button`               | atom     | `components/atoms/Button.svelte`                   |
| `Input`                | atom     | `components/atoms/Input.svelte`                    |
| `Select`               | atom     | `components/atoms/Select.svelte`                   |
| `Badge`                | atom     | `components/atoms/Badge.svelte`                    |
| `Spinner`              | atom     | `components/atoms/Spinner.svelte`                  |
| `FormField`            | molecule | `components/molecules/FormField.svelte`            |
| `SearchBar`            | molecule | `components/molecules/SearchBar.svelte`            |
| `ConfirmDialog`        | molecule | `components/molecules/ConfirmDialog.svelte`        |
| `SchoolCard`           | molecule | `components/molecules/SchoolCard.svelte`           |
| `SchoolsTable`         | organism | `components/organisms/SchoolsTable.svelte`         |
| `SchoolForm`           | organism | `components/organisms/SchoolForm.svelte`           |
| `ClassesTable`         | organism | `components/organisms/ClassesTable.svelte`         |
| `ClassForm`            | organism | `components/organisms/ClassForm.svelte`            |
| `AppHeader`            | organism | `components/organisms/AppHeader.svelte`            |
| `SchoolsTableSkeleton` | molecule | `components/molecules/SchoolsTableSkeleton.svelte` |
| `SchoolCardSkeleton`   | molecule | `components/molecules/SchoolCardSkeleton.svelte`   |

All shadcn-svelte primitives live in `src/lib/components/ui/` and are consumed by the layers above.

---

## 21. Do / Don't

| Do                                                          | Don't                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| Use Poppins 600–700 for headings                            | Use Poppins for body copy                                  |
| Use Roboto for all body, label, and small text              | Mix font families within the same text block               |
| Use 6px radius for interactive elements                     | Use fully rounded (pill) shapes on anything except avatars |
| Show a ConfirmDialog before every delete action             | Trigger delete from a single button click                  |
| Use gradient on Primary button; fill animation on Secondary | Apply the same style to both variants                      |
| Use Skeleton placeholders for loading states                | Use a centered spinner as the primary loading pattern      |
| Auto-focus Cancel in destructive confirm modals             | Auto-focus the destructive action                          |
| Show toast with entity name after mutation                  | Show generic "Saved" / "Error" toasts                      |
| Meet WCAG AA on every text/background pair                  | Rely on color alone to communicate status                  |
| Stagger new list item animations (max 5 items)              | Animate every render of an already-loaded list             |
