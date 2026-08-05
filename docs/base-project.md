# Base Project — Technology Decisions

Decision log for the school/class management technical challenge. All repository text (UI copy, docs, commit messages, code identifiers meant for display) must be **in English**.

This document locks the stack before feature implementation. Items marked **DECIDED** are proposed defaults. Items marked **OPEN** need explicit confirmation before install.

---

## 1. Core quality goals — semantic, readable, accessible

**Semantic naming, readability, and WCAG accessibility are first-class goals**, equal in priority to “it works.” This is a deliberately simple system: every file, function, component, and prop should be understandable on a first read without tribal knowledge or dense abstractions, and every UI must meet **WCAG 2.2 Level AA**.

**Comments are forbidden.** Good semantic code is readable without comments. If a block needs a comment to be understood, rename, split, or restructure it — do not add a comment. Do not use `svelte-ignore` to silence a11y warnings. See [`code-rules.md`](./code-rules.md) / [`../CLAUDE.md`](../CLAUDE.md).

| Principle                   | What it means in practice                                                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantic names              | Prefer `isSchoolSelected`, `hasClasses`, `handleDeleteSchool` over vague names (`data`, `flag`, `onClick1`, `tmp`)                                                                                             |
| Readable structure          | Small modules, one clear responsibility, spacing between logical blocks, early returns instead of nested pyramids                                                                                              |
| Obvious data flow           | Routes load data → services talk to the API → organisms receive props — no hidden side effects in leaf components                                                                                              |
| No comments                 | Names and structure replace comments; comments are banned in all source files                                                                                                                                  |
| Familiar SvelteKit patterns | Stick to standard `+page.ts` / `+page.svelte`, runes, and the folder layout in [`../CLAUDE.md`](../CLAUDE.md) — avoid clever indirection                                                                       |
| Thin layers                 | Prefer a straightforward service method and a plain form over wrappers that obscure what the app is doing                                                                                                      |
| HTML semantics              | Real headings, labels, buttons, tables, and landmarks — not `div` soup                                                                                                                                         |
| WCAG 2.2 AA                 | Keyboard access, labelled forms, contrast tokens, role-based E2E, Bits UI / shadcn for complex widgets — see [`code-rules.md`](./code-rules.md) Accessibility and [`design-system.md`](./design-system.md) §17 |

When choosing a library or pattern later, prefer the option that keeps the codebase **easier to read** over the option that is merely more “powerful” or trendy.

Stack choices below are filtered through this lens: Tailwind + shadcn-svelte for clear UI building blocks, named services for API calls, feature folders for domain logic, and colocated tests that describe behavior.

---

## 2. Challenge summary

| Area          | Requirement                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Domain        | Municipal schools and their classes (replace spreadsheet control)                              |
| Framework     | SvelteKit (stable) + TypeScript + HTML5/CSS3                                                   |
| Mock API      | json-server — `GET/POST/PUT/DELETE` on `/schools` and `/classes`                               |
| E2E           | Playwright                                                                                     |
| Quality       | **Semantic + readable + WCAG AA**, ESLint + Prettier, Git history, public GitHub repo + README |
| Differentials | Vitest, feature-based architecture, component reuse, CI/CD                                     |

### Product features

- Schools: list, create, edit, delete, search/filter
- Classes: list by school, create, edit, delete

### Already in the scaffold (do not replace)

| Piece                                | Status          |
| ------------------------------------ | --------------- |
| SvelteKit 2 + Svelte 5 (runes)       | Installed       |
| TypeScript (strict)                  | Installed       |
| json-server (`db.json`, port `3001`) | Installed       |
| Vitest                               | Installed       |
| Playwright                           | Installed       |
| ESLint + Prettier                    | Installed       |
| pnpm                                 | Package manager |

Architecture conventions live in [`../CLAUDE.md`](../CLAUDE.md) and [`code-rules.md`](./code-rules.md) (atomic design, services, features, no comments, verification gate). Those rules exist to protect the semantic + readable goals in §1. Visual UI decisions live in [`design-system.md`](./design-system.md).

---

## 3. Styling

### DECIDED — Tailwind CSS v4 (mandatory)

| Choice       | Value                                                | Why                                                                      |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| Framework    | **Tailwind CSS v4**                                  | Mandatory; utility-first; matches shadcn-svelte current setup            |
| Integration  | `@tailwindcss/vite`                                  | Official Vite plugin for v4 (no PostCSS-only path)                       |
| Config style | CSS-first (`@theme`, `@import "tailwindcss"`)        | Tailwind v4 default — no legacy `tailwind.config.js` unless needed       |
| Class merge  | `clsx` + `tailwind-merge` via a shared `cn()` helper | Required by shadcn-svelte patterns                                       |
| Variants     | `tailwind-variants`                                  | Used by shadcn-svelte component variants                                 |
| Animations   | `tw-animate-css`                                     | Current shadcn-svelte companion (replaces `tailwindcss-animate`)         |
| Prettier     | `prettier-plugin-tailwindcss`                        | Sort classes consistently (load **last** after `prettier-plugin-svelte`) |

No alternative CSS framework (Bootstrap, UnoCSS, plain CSS modules as primary system).

---

## 4. UI component system

### DECIDED — shadcn-svelte (copy-in components)

| Choice         | Value                                               | Why                                                               |
| -------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| Library        | **[shadcn-svelte](https://www.shadcn-svelte.com/)** | Accessible primitives + owned source; fits Svelte 5 / Tailwind v4 |
| Headless layer | **Bits UI** (pulled in by shadcn-svelte)            | Keyboard, focus, ARIA — supports the WCAG differential            |
| Style preset   | `new-york`                                          | Current shadcn-svelte default                                     |
| Install path   | `src/lib/components/atoms/`                         | Atomic design primitives; shadcn CLI `ui` alias points here       |
| Theming        | CSS variables (OKLCH) from shadcn init              | Light theme first; dark mode optional via `mode-watcher` later    |

**Not chosen:** Flowbite-Svelte, Skeleton, DaisyUI, Melt UI alone, or a fully hand-rolled design system from scratch.

### How this maps to atomic design

shadcn-svelte components are installed **into `atoms/`** (no separate `ui/` folder). Domain UI follows classic atomic design:

```
src/lib/components/
  atoms/         # primitives (Input, Select, Label, Button, …) — owned shadcn/Bits sources
  molecules/     # SearchBar, FormField, ConfirmDialog, SchoolCard, …
  organisms/     # SchoolsTable, SchoolForm, ClassesTable, ClassForm, AppHeader, …
```

Rules:

- Compose `atoms/*` inside molecules/organisms — do not add a parallel `ui/` tree.
- Do **not** invent a second Button/Input that reimplements an existing atom.
- Organisms receive data via props; routes/`load` + services own fetching (see [`../CLAUDE.md`](../CLAUDE.md)).

### Initial shadcn components to add (when scaffolding UI)

| Component       | Used for                                                               |
| --------------- | ---------------------------------------------------------------------- |
| `button`        | Actions, links-as-buttons                                              |
| `input`         | Text fields                                                            |
| `label`         | Form labels                                                            |
| `textarea`      | Longer text (address, notes if any)                                    |
| `select`        | Shift/grade filters and form selects                                   |
| `table`         | Schools and classes lists                                              |
| `dialog`        | Confirm delete                                                         |
| `badge`         | Shift, status chips                                                    |
| `card`          | School summary on detail                                               |
| `separator`     | Layout structure                                                       |
| `skeleton`      | **Required** — loading placeholders for lists, cards, and detail views |
| `sonner`        | Toast feedback after mutations                                         |
| `dropdown-menu` | Row actions (optional)                                                 |
| `alert`         | Inline error states                                                    |

Add others only when a screen needs them.

### DECIDED — Skeleton loading via shadcn-svelte

| Choice       | Value                                                                                     | Why                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Loading UX   | **Skeleton placeholders** (not spinners as the primary pattern)                           | Clearer layout while schools/classes data loads                                              |
| Component    | **shadcn-svelte `skeleton`** (`pnpm dlx shadcn-svelte@latest add skeleton`)               | Official component; Tailwind-styled pulse blocks; lives in `src/lib/components/atoms/Skeleton/` |
| Fallback lib | **None** — only add a dedicated skeleton library if shadcn `Skeleton` proves insufficient | Avoids an extra dependency for a solved use case                                             |

Usage pattern:

- Compose multiple `<Skeleton />` blocks into feature-specific loading UIs (e.g. `SchoolsTableSkeleton`, `SchoolCardSkeleton`) under `molecules/` or next to the organism they mirror.
- Prefer skeletons for initial page/section load; reserve a small spinner only for short inline actions (button pending state) if needed.
- Keep skeleton dimensions close to the real content shape so the layout does not jump when data arrives.

**Not chosen:** a separate skeleton library (e.g. generic pulse packages), full-page spinners as the default loading state.

---

## 5. Icons

### DECIDED — `@lucide/svelte`

| Choice  | Value                                                                  | Why                                                                        |
| ------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Package | **`@lucide/svelte`**                                                   | Official Lucide package for Svelte 5; what shadcn-svelte generates against |
| Usage   | Tree-shakeable named imports (`import { Plus } from '@lucide/svelte'`) | Keeps bundle small                                                         |

**Do not install** the legacy `lucide-svelte` package (avoids duplicate icon libs).

**Not chosen:** Heroicons, Phosphor, Font Awesome, Material Icons.

---

## 6. Forms and validation

### DECIDED — Zod + Superforms (SvelteKit-native)

| Choice       | Value                                                          | Why                                                                                   |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Schema       | **Zod**                                                        | Typed schemas shared between client validation and inferred types                     |
| Forms        | **sveltekit-superforms**                                       | Idiomatic SvelteKit forms; works with progressive enhancement and runes               |
| Bridge       | `sveltekit-superforms/adapters` (zod)                          | Connect Zod schemas to Superforms                                                     |
| shadcn forms | Prefer Superforms + shadcn field components over Formsnap-only | Clearer ownership of validation; Formsnap stays optional if a generated form needs it |

Validation lives next to feature form types (`src/lib/features/schools/`, `src/lib/features/classes/`), not inside organisms as ad-hoc checks.

### OPEN — confirm Formsnap

| Option              | Notes                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **A (recommended)** | Superforms + Zod only; use shadcn `Label`/`Input`/`Field`-style markup manually          |
| **B**               | Also install **Formsnap** (shadcn-svelte form companion) for generated form field wiring |

Default for this doc until you say otherwise: **Option A**.

---

## 7. Feedback, state, and utilities

| Concern                | Choice                                                                       | Status                            |
| ---------------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| Toasts                 | **svelte-sonner** (shadcn `sonner`)                                          | DECIDED                           |
| Loading states         | **shadcn-svelte `Skeleton`** (composed into feature loading UIs)             | DECIDED                           |
| Client shared UI state | Svelte 5 runes modules (`*.svelte.ts`) under `src/lib/stores/`               | DECIDED (already in architecture) |
| Dark mode              | Skip for MVP; add `mode-watcher` only if we ship a theme toggle              | DECIDED (defer)                   |
| Date/number formatting | Native `Intl`                                                                | DECIDED                           |
| Phone display          | Small util `formatPhone.ts`                                                  | DECIDED (architecture)            |
| HTTP                   | Custom `apiClient` + `schoolsService` / `classesService` — **no** axios / ky | DECIDED                           |
| Env                    | `PUBLIC_API_BASE_URL` (or equivalent) pointing at `http://localhost:3001`    | DECIDED                           |

---

## 8. Mock API

### DECIDED — json-server (already configured)

| Choice    | Value                                     |
| --------- | ----------------------------------------- |
| Tool      | json-server `0.17.x` (pinned in scaffold) |
| Data file | `db.json`                                 |
| Port      | `3001`                                    |
| Resources | `/schools`, `/classes`                    |
| Script    | `pnpm run json-server`                    |

Notes:

- Seed data currently uses Portuguese strings — **translate seed + UI to English** when implementing features (repo language rule).
- Filtering/search can be client-side for MVP; json-server query params (`?q=`, `?schoolId=`) are allowed when useful.
- Nothing outside `src/lib/services/api/` calls `fetch`.

---

## 9. Testing

| Layer            | Tool                                              | Status                        |
| ---------------- | ------------------------------------------------- | ----------------------------- |
| Unit / component | **Vitest** (+ Testing Library patterns as needed) | Already in scaffold — DECIDED |
| E2E              | **Playwright**                                    | Already in scaffold — DECIDED |
| Unit location    | Colocated `*.test.ts` next to source              | DECIDED                       |
| E2E location     | `e2e/*.e2e.ts`                                    | DECIDED                       |

E2E scenarios must cover the mandatory flows: school CRUD, class CRUD under a school, search/filter.

### OPEN — component testing helper

| Option              | Notes                                                |
| ------------------- | ---------------------------------------------------- |
| **A (recommended)** | `@testing-library/svelte` for Vitest component tests |
| **B**               | Vitest + native `mount` / Svelte testing only        |

Default: **Option A**.

---

## 10. Accessibility (WCAG 2.2 AA — primary focus)

Accessibility is a **core delivery goal**, not an optional differential. Full engineering rules: [`code-rules.md`](./code-rules.md) (Accessibility). Visual rules: [`design-system.md`](./design-system.md) §17.

| Practice    | How                                                                                     |
| ----------- | --------------------------------------------------------------------------------------- |
| Standard    | **WCAG 2.2 Level AA**                                                                   |
| Primitives  | Prefer Bits UI / shadcn-svelte for dialogs, selects, menus (focus trap, keyboard, ARIA) |
| Semantics   | Landmarks, heading hierarchy, labelled forms, real `<button>` / `<a>` / tables          |
| Keyboard    | All CRUD and filter actions operable without a pointer                                  |
| Contrast    | Design tokens only; body text ≥ 4.5:1, large text / UI ≥ 3:1                            |
| Status      | Never color-only; pair with text or icon + text                                         |
| Page titles | Unique `<title>` per route for SvelteKit route announcements                            |
| Compiler    | Fix all Svelte `a11y_*` warnings; never `svelte-ignore` them                            |
| E2E         | Playwright `getByRole` / accessible name; verify with Playwright MCP snapshots          |

No separate a11y ESLint plugin required beyond Svelte’s built-in a11y checks + Bits UI + manual / Playwright verification.

---

## 11. CI/CD (differential)

### DECIDED — GitHub Actions

Pipeline on push/PR to `main` (and PR branches):

1. Install with pnpm
2. `pnpm run check`
3. `pnpm run lint`
4. `pnpm run test:unit -- --run`
5. `pnpm run test:e2e` (with json-server + app started, or Playwright `webServer` config)

### OPEN — deploy target

| Option | Notes                                                         |
| ------ | ------------------------------------------------------------- |
| **A**  | No deploy — CI only (enough for the challenge)                |
| **B**  | Vercel / Netlify / Cloudflare Pages via `@sveltejs/adapter-*` |

Default: **Option A** (CI only). Adapter stays `@sveltejs/adapter-auto` until a host is chosen.

---

## 12. Package manager, Node, language

| Choice             | Value                                                                           |
| ------------------ | ------------------------------------------------------------------------------- |
| Package manager    | **pnpm**                                                                        |
| Node               | **20+**                                                                         |
| UI / docs language | **English only**                                                                |
| Git                | Feature commits with clear English messages; no force-push / amend unless asked |

---

## 13. Libraries we will **not** add

| Library                                    | Reason                                   |
| ------------------------------------------ | ---------------------------------------- |
| axios / ky                                 | Native `fetch` via `apiClient` is enough |
| Redux / Zustand / legacy Svelte stores API | Runes modules cover shared state         |
| Bootstrap / MUI-style CSS kits             | Conflicts with Tailwind + shadcn         |
| Chart libraries                            | Out of scope                             |
| i18n framework                             | Single language (English)                |
| ORM / real database                        | json-server only                         |

---

## 14. Install plan (after decisions confirmed)

Order of work when scaffolding the remaining base:

1. Add Tailwind v4 (`@tailwindcss/vite`) + global CSS entry
2. Init shadcn-svelte (`pnpm dlx shadcn-svelte@latest init`) — `new-york`, install path `atoms/` (`components.json` `ui` alias → `$lib/components/atoms`)
3. Install `@lucide/svelte`, `clsx`, `tailwind-merge`, `tailwind-variants`, `tw-animate-css`, `svelte-sonner`
4. Add core shadcn components listed in §4 into `atoms/`
5. Add Zod + sveltekit-superforms (+ `@testing-library/svelte` if Option A)
6. Wire `PUBLIC_API_BASE_URL`, `cn()` util, empty service stubs if not present
7. Add GitHub Actions workflow
8. Translate `db.json` seed to English
9. Update [`README.md`](./README.md) to English (challenge delivery language)

Do not install anything from this list until the **OPEN** items below are confirmed (or defaults accepted).

---

## 15. Decision checklist

Confirm or override:

| #   | Topic                                                                           | Proposed        | Your call                |
| --- | ------------------------------------------------------------------------------- | --------------- | ------------------------ |
| 0   | Semantic + readable + **WCAG 2.2 AA** as core quality goals; comments forbidden | Yes             | Locked                   |
| 1   | Tailwind CSS v4                                                                 | Yes (mandatory) | Locked                   |
| 2   | shadcn-svelte + Bits UI installed into `components/atoms/`                      | Yes             | Locked                   |
| 3   | No separate `ui/` folder — atomic design only (`atoms` / `molecules` / `organisms`) | Yes         | Locked                   |
| 4   | Icons `@lucide/svelte`                                                          | Yes             | Locked                   |
| 5   | Forms: Superforms + Zod (no Formsnap)                                           | Option A        | Confirm A or B           |
| 6   | Toasts: svelte-sonner                                                           | Yes             | Locked                   |
| 7   | Skeleton loading via shadcn `Skeleton` (no extra lib)                           | Yes             | Locked                   |
| 8   | Dark mode deferred                                                              | Yes             | Confirm                  |
| 9   | Vitest + Testing Library                                                        | Option A        | Confirm A or B           |
| 10  | CI: GitHub Actions, no deploy                                                   | Option A        | Confirm A or B           |
| 11  | English everywhere (incl. seed data)                                            | Yes             | Locked                   |

---

## 16. Stack snapshot (target)

```
Quality first: semantic names + readable structure + WCAG 2.2 AA
SvelteKit 2 + Svelte 5 (runes) + TypeScript
Tailwind CSS v4 + tw-animate-css
shadcn-svelte (Bits UI) → src/lib/components/atoms
  including Skeleton for loading states
@lucide/svelte
clsx + tailwind-merge + tailwind-variants
sveltekit-superforms + Zod
svelte-sonner
json-server
Vitest (+ Testing Library)
Playwright (role/name locators)
ESLint + Prettier (+ prettier-plugin-tailwindcss)
pnpm
GitHub Actions (CI)
```

Once the checklist in §15 is confirmed, the next step is to apply the install plan (§14) on top of the current scaffold.
