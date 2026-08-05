# Project Rules

This file is the entry point for project-wide rules. **Before non-trivial work, read the docs in [`docs/`](./docs/)** — do not rely on memory of past decisions.

## Required documentation (read these)

All project docs live under **[`docs/`](./docs/)**, except this file. New docs use **kebab-case** filenames (`code-rules.md`, `base-project.md`); `CLAUDE.md` and `README.md` keep their conventional casing.

| File                                                 | When to read                                                                   | What it covers                                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[CLAUDE.md](./CLAUDE.md)** (this file)             | Every session                                                                  | Project overview, quality goals, hard-rule summary, target folder layout, Graphify, pointer to `docs/`, reference UI                             |
| **[docs/code-rules.md](./docs/code-rules.md)**       | Before writing or changing code                                                | TypeScript, Svelte 5 / SvelteKit conventions, components, services/stores/utils, error handling, testing, verification (`svelte-check` + ESLint) |
| **[docs/base-project.md](./docs/base-project.md)**   | Before adding libraries, UI primitives, forms, CI, or scaffolding stack pieces | Locked tech/stack decisions (Tailwind, shadcn-svelte, icons, forms, skeleton loading, etc.) and install plan                                     |
| **[docs/design-system.md](./docs/design-system.md)** | **Before any UI, styling, or visual work** — mandatory                         | Typography, color (OKLCH tokens), spacing, components, motion, WCAG AA visuals — civic Swiss system. **Source of truth** for look-and-feel       |
| **[docs/README.md](./docs/README.md)**               | When changing install/run/test instructions or delivery docs                   | How to install, run the app + json-server, and run tests (keep in sync with reality)                                                             |

Optional (local only, gitignored — regenerate, never commit):

| File                           | When to read                                                            | What it covers                                                                  |
| ------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `graphify-out/GRAPH_REPORT.md` | Broad architecture pass when Graphify query/path/explain are not enough | Generated architecture overview (includes this repo + reference UI when merged) |
| `graphify-out/wiki/index.md`   | Broad navigation if it exists                                           | Wiki-style graph index                                                          |

Always read **[`docs/code-rules.md`](./docs/code-rules.md)** before implementing. Always consult **[`docs/base-project.md`](./docs/base-project.md)** before installing or proposing a new dependency — do not invent stack choices that contradict it. Always follow **[`docs/design-system.md`](./docs/design-system.md)** for visual UI work — do not invent colors, type, or spacing outside that doc.

## Reference UI (structure to mimic)

A Figma Make React prototype defines the **screens, components, and interaction shape** we recreate in SvelteKit (not the React stack itself).

| Item                       | Location                                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Absolute path              | `/Users/gabrieldemenezesnogueira/Downloads/School Management App`                                                                   |
| Local symlink (gitignored) | `reference/school-management-app` → absolute path above                                                                             |
| Design tokens in that repo | `src/imports/pasted_text/design-system.md` (mirror only — **canonical copy is [`docs/design-system.md`](./docs/design-system.md)**) |

### Reference layout → SvelteKit mapping

| Reference (React)                                           | This project (SvelteKit)                                               |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `src/views/SchoolsView.tsx`                                 | `src/routes/schools/+page.svelte` + `SchoolsTable` organism            |
| `src/views/SchoolDetailView.tsx`                            | `src/routes/schools/[id]/+page.svelte` + classes table/card            |
| `src/components/AppHeader.tsx`                              | `src/lib/components/organisms/AppHeader.svelte`                        |
| `src/components/SearchBar.tsx`                              | `src/lib/components/molecules/SearchBar.svelte`                        |
| `src/components/Badge.tsx` / `Spinner.tsx`                  | atoms (or `ui/` via shadcn)                                            |
| `src/components/ConfirmModal.tsx`                           | `molecules/ConfirmDialog.svelte` (shadcn dialog)                       |
| `src/components/SchoolFormModal.tsx` / `ClassFormModal.tsx` | `organisms/SchoolForm.svelte` / `ClassForm.svelte` (routes or dialogs) |
| `src/components/Toast.tsx`                                  | svelte-sonner + `stores/toast.svelte.ts`                               |
| `src/components/DropdownMenu.tsx`                           | shadcn `dropdown-menu` in row actions                                  |
| `src/mock/data.ts`                                          | `db.json` + `src/lib/types/` + services (real CRUD via json-server)    |

When implementing UI: read the matching reference file under `reference/school-management-app/` (or the absolute path), apply [`docs/design-system.md`](./docs/design-system.md), and rebuild in Svelte 5 — English copy, WCAG AA, no React patterns.

Ensure the symlink exists before UI work:

```sh
mkdir -p reference
ln -sfn "/Users/gabrieldemenezesnogueira/Downloads/School Management App" reference/school-management-app
```

## Required MCPs (every implementation)

Configured in `~/.cursor/mcp.json`. **Use these on every implementation task** — do not rely on memory of Svelte/SvelteKit APIs or skip browser verification when a UI flow is involved.

### `svelte` (`@sveltejs/mcp`) — mandatory for Svelte / SvelteKit work

| When                                          | What to do                                                                                                                          |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Starting any Svelte or SvelteKit task         | Call `list-sections`, then `get-documentation` for every section relevant to the task (routing, runes, forms, load functions, etc.) |
| Writing or editing `.svelte` / Svelte modules | Run `svelte-autofixer` on the code **before** considering the change done; fix issues and re-run until clean                        |
| Sharing a disposable snippet with the user    | Offer `playground-link` only if the user wants one                                                                                  |

Never invent Svelte 5 / SvelteKit APIs from memory when the MCP can supply the official docs. Prefer MCP guidance over outdated blog patterns.

### `Playwright` (`@playwright/mcp`) — mandatory for UI and E2E work

| When                                     | What to do                                                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementing or changing screens / flows | Use Playwright MCP browser tools to open the app, exercise the flow, and confirm behavior (navigate, snapshot, click, fill, assert via snapshot/text) |
| Writing or updating E2E specs            | Align locators and scenarios with what the Playwright MCP observes in the real UI (prefer role/name locators)                                         |
| Debugging a broken UI or test            | Reproduce with Playwright MCP first; inspect console/network when needed                                                                              |

Ensure `pnpm run json-server` and `pnpm run dev` (or preview) are running when the flow needs the API. Do not mark a UI feature done without MCP-backed browser verification unless the user explicitly asked for code-only changes.

If an MCP namespace shows `needsAuth` or is unavailable, authenticate or report the blocker — do not silently skip these steps.

## What this project is

A técnical-challenge school/class management app for a city education department (`school-management-sveltekit`). Stack: **SvelteKit + Svelte 5** (runes mode is forced project-wide, see `vite.config.ts`), **TypeScript** (strict), **json-server** as a mock REST API (`db.json`, `/schools` and `/classes`), **Vitest** for unit tests, **Playwright** for E2E, **ESLint + Prettier**. Package manager is **pnpm**. Full stack rationale: [`docs/base-project.md`](./docs/base-project.md). Visual system (**mandatory for UI**): [`docs/design-system.md`](./docs/design-system.md). Screen/component structure to mimic: **Reference UI** below.

The repo is currently a scaffold — routing, CRUD screens, search/filter, and feature organization are still to be built on top of it. Treat the structure below as the target layout, not something already fully populated.

### Running it locally

The app needs **two processes** in parallel:

1. `pnpm run json-server` — mock API from `db.json` on `http://localhost:3001`.
2. `pnpm run dev` — SvelteKit dev server on `http://localhost:5173`.

Any task that involves exercising a data flow (not just static markup) needs both running. Don't assume the API is up — check before diagnosing a "broken" fetch as a code bug.

## Core quality goals — semantic, readable, accessible

**Semantic naming, readability, and WCAG accessibility are first-class goals**, equal in priority to “it works.” This is a deliberately simple system: every file, function, component, and prop should be understandable on a first read, and every screen must be usable with keyboard and assistive technology.

**Comments are forbidden.** Semantic, readable code explains itself through naming and structure. If a block needs a comment to be understood, rename, split, or restructure it — do not add a comment. This applies to `.ts`, `<script>` blocks, and Svelte markup (`<!-- -->`). No exceptions for “why”, workarounds, TODO/FIXME/NOTE, doc comments on implementation code, or `svelte-ignore` to silence a11y warnings — fix the markup instead. When you touch a region that already has comments, remove them as part of the change.

- **Semantic names** — prefer `isSchoolSelected`, `hasClasses`, `handleDeleteSchool` over vague names (`data`, `flag`, `onClick1`, `tmp`). Booleans use `is` / `has` / `should` prefixes.
- **Readable structure** — small modules, one clear responsibility, spacing between logical blocks, early returns instead of nested pyramids.
- **Obvious data flow** — routes load data → services talk to the API → organisms receive props. No hidden side effects in leaf components.
- **Self-documenting code** — good code is readable without comments; comments are banned (see above).
- **Familiar SvelteKit patterns** — stick to standard `+page.ts` / `+page.svelte`, runes, and the folder layout below. Avoid clever indirection.
- **Thin layers** — prefer a straightforward service method and a plain form over wrappers that obscure what the app is doing.
- **HTML semantics** — real headings, labels, buttons, tables, and landmarks — not `div` soup.
- **WCAG 2.2 Level AA** — accessibility is a main focus, not a nice-to-have. Follow [`docs/code-rules.md`](./docs/code-rules.md) (Accessibility) and [`docs/design-system.md`](./docs/design-system.md) §17. Prefer shadcn-svelte / Bits UI primitives for complex widgets.

When choosing a library or pattern, prefer the option that keeps the codebase **easier to read** and **more accessible** over the option that is merely more powerful or trendy. Stack decisions that reinforce this live in [`docs/base-project.md`](./docs/base-project.md).

## Hard rules (summary)

The full text and rationale are in [`docs/code-rules.md`](./docs/code-rules.md). These are the highlights:

- **Semantic + readable + accessible first:** write code a new reader can follow, and UI that meets WCAG AA. Prefer clarity over cleverness; see **Core quality goals** above and **Accessibility** in [`docs/code-rules.md`](./docs/code-rules.md).
- **WCAG AA is mandatory for UI work:** semantic HTML, keyboard access, labelled forms, visible focus, contrast via design tokens, unique page titles, and Playwright role/name locators. Do not silence Svelte `a11y_*` warnings — fix the cause. Visual tokens: [`docs/design-system.md`](./docs/design-system.md).
- **Required MCPs on every implementation:** use the **`svelte`** MCP (docs + `svelte-autofixer`) for all Svelte/SvelteKit work, and the **`Playwright`** MCP to verify UI flows and guide E2E. See **Required MCPs** above — skipping them is not allowed unless the user asks for code-only changes or an MCP is blocked.
- **Comments are forbidden (absolute):** good semantic code is readable without comments. Never add comments in `.ts`, `<script>` blocks, or Svelte markup (`<!-- -->`). No exceptions for "why", workarounds, TODO/FIXME/NOTE, doc comments on implementation code, or silencing a11y with `svelte-ignore`. If something is unclear or inaccessible, rename or restructure — do not comment. When you touch a region that already has comments, remove them as part of the change.
- **No blank or no-op `if` blocks:** never write an `if`/`else if` whose body is empty or would become empty once comments are removed. Omit branches that intentionally do nothing; use early return / inverted conditions instead.
- **Check existing implementation before proposing changes:** when asked to "build" or "redesign" something, first check whether it already works and say so before drafting a rewrite. Surface what's already in place and let the user decide whether to align/refactor or skip.
- **TypeScript:** no `any` / `unknown` / `never`. No inline types — always a named, exported `interface`/`type`. Named functions with explicit return types everywhere. Svelte 5 runes typed explicitly (`$state<T>()`, typed `Props` interfaces for `$props()`). See [`docs/code-rules.md`](./docs/code-rules.md).
- **Svelte 5 only, runes-based:** no `export let` props, no `$:` reactive statements, no lifecycle-based data fetching where a `load` function belongs. See [`docs/code-rules.md`](./docs/code-rules.md) for the full list of banned Svelte 4 patterns.
- **No inline function bodies in Svelte event attributes.** Extract handlers with real logic into a named function declared in the component's `<script>` block. Only a one-line dispatcher closure (`onclick={() => handleSave(item.id)}`) is allowed inline.
- **No single-use display-string constants.** Static copy rendered in exactly one place stays inline in the markup — don't hoist it into a top-level `const`. Extract only what's genuinely reused or is a non-display identifier (key, route, namespace).
- **Styling is Tailwind only (hard):** layout and visuals use Tailwind utility classes. Ban script-built `style=` strings (`$derived` + `.join()` / template CSS), inline layout `style=`, and component layout CSS in `app.css`. Custom CSS is allowed **only** for animations (`@keyframes` / reduced-motion) and global design tokens in `@theme` / `:root`. No TS constants whose sole purpose is feeding layout styles. Full rule in [`docs/code-rules.md`](./docs/code-rules.md); Cursor mirror: [`.cursor/rules/tailwind-styling.mdc`](./.cursor/rules/tailwind-styling.mdc).
- **Responsive UI is mandatory (hard):** every UI surface must work from mobile through desktop using the design-system breakpoints (`sm` 640 / `md` 768 / `lg` 1000 / `xl` 1280). Mobile-first Tailwind; no horizontal overflow; hide or reflow secondary chrome on small viewports. Full rule in [`docs/code-rules.md`](./docs/code-rules.md); breakpoints in [`docs/design-system.md`](./docs/design-system.md) §18.
- **No explicit `null` / `undefined` comparisons.** `!== null`, `=== undefined`, `!= null`, etc. are all banned — use the truthy/falsy check directly. If a falsy value (`0`, `''`, `false`) would be ambiguous with "absent," refactor the state shape instead.
- **Verification is a mandatory gate, not optional.** Run `pnpm run check` (svelte-check + TS) and `pnpm run lint` (Prettier + ESLint) on every change before calling it done. Fix every error; for UI files also fix Svelte `a11y_*` warnings. Other ESLint warnings can be ignored. Full protocol in [`docs/code-rules.md`](./docs/code-rules.md).
- **Git:** don't commit, push, or switch/create branches unless explicitly asked — this is a solo project, but "prepare the code" is not authorization to run `git commit`. Never run history-rewriting commands (`push --force`, `reset --hard`, `commit --amend`) without being asked for that specific action.
- **Scope discipline:** only touch the files a task actually needs. After running any formatter/codegen that can rewrite broadly, check `git status`/`git diff --stat` immediately — if it touched unrelated files, revert those and hand-edit just what's needed instead.

## Project structure (target layout)

This project uses **atomic design** for all reusable UI (atoms → molecules → organisms), plus SvelteKit's own file-based routing for pages. Concrete example, filled in with this domain's likely files — not everything below exists yet, but new files follow this shape:

```
CLAUDE.md                                # agent entry — references docs/
docs/
  README.md                              # install, run, test instructions
  code-rules.md                          # TypeScript / Svelte / verification rules
  base-project.md                        # locked stack and library decisions
  design-system.md                       # visual system (type, color, components)
db.json                                  # mock data consumed by json-server (/schools, /classes)
src/
  routes/
    +layout.svelte                       # global shell: nav/header composition only
    +page.svelte                         # dashboard / landing
    schools/
      +page.svelte                       # schools list — composes SchoolsTable + SearchBar
      +page.ts                           # load(): schoolsService.list()
      new/
        +page.svelte                     # composes SchoolForm
      [id]/
        +page.svelte                     # school detail — composes SchoolCard, ClassesTable
        +page.ts                         # load(): schoolsService.get(params.id)
        edit/
          +page.svelte                   # composes SchoolForm (edit mode)
    classes/
      [id]/
        +page.svelte                     # class detail
        edit/
          +page.svelte                   # composes ClassForm (edit mode)
  lib/
    components/
      atoms/                             # smallest reusable pieces — no business logic, no store/service imports
        Button.svelte
        Button.svelte.test.ts
        Input.svelte
        Select.svelte
        Badge.svelte
        Spinner.svelte
      molecules/                         # a few atoms composed together, still purely presentational
        FormField.svelte                 # Input/Select + label + error text
        SearchBar.svelte                 # mirrors reference SearchBar
        ConfirmDialog.svelte             # mirrors reference ConfirmModal
        SchoolCard.svelte
        DropdownMenu.svelte              # or shadcn dropdown-menu — row actions
      organisms/                         # full domain sections; receive data via props, not self-fetching
        SchoolsTable.svelte              # mirrors reference SchoolsView table
        SchoolForm.svelte                # mirrors reference SchoolFormModal
        ClassesTable.svelte
        ClassForm.svelte                 # mirrors reference ClassFormModal
        AppHeader.svelte                 # mirrors reference AppHeader
    features/
      schools/
        constants.ts
        types.ts
        buildSchoolFormValues.ts
      classes/
        constants.ts
        types.ts
        deriveClassesForSchool.ts
    services/
      api/
        apiClient.ts
        schoolsService.ts
        classesService.ts
    stores/
      schoolsFilter.svelte.ts
      toast.svelte.ts                    # mirrors reference Toast / ToastContainer
    utils/
      formatPhone.ts
      getApiErrorMessage.ts
    types/
      School.ts
      SchoolClass.ts
    constants/
      routes.ts
static/
  robots.txt
e2e/
  schools.e2e.ts
  classes.e2e.ts
```

Canonical visual system: [`docs/design-system.md`](./docs/design-system.md). Mimic UI structure from **Reference UI** (not React APIs).

### Atomic design rules

- **atoms** (`src/lib/components/atoms/`) — the smallest reusable pieces (`Button`, `Input`, `Select`, `Badge`, `Spinner`). No business logic, no imports from `services/`, `stores/`, or `features/`. Everything comes in through typed props; styling and markup only.
- **molecules** (`src/lib/components/molecules/`) — a small composition of 2+ atoms (`FormField` = `Input`/`Select` + label + error text; `SchoolCard`; `SearchBar`). Still presentational — no direct API/service calls. May accept typed callback props (`onSearch: (query: string) => void`).
- **organisms** (`src/lib/components/organisms/`) — full domain sections (`SchoolsTable`, `SchoolForm`, `ClassForm`, `AppHeader`). These compose molecules/atoms and know about the domain shape (`School`, `SchoolClass`), but still **receive their data via props** from the route that renders them — a route's `load` function (or a service call in an event handler for a mutation) is the one place that talks to `schoolsService`/`classesService`, not the organism itself.
- **Global folders only.** Don't create a local `atoms/`/`molecules/`/`organisms/` folder inside `features/<feature>/` — all reusable UI lives in the three folders above. Feature-local, non-reusable helpers (`constants.ts`, `types.ts`, `derive*`/`build*` functions) live in `src/lib/features/<feature>/`, next to (not inside) the organism they support.
- Before adding a new atom/molecule, check the existing folder for one that already fits — don't create a near-duplicate `Button2.svelte` or a one-off inline-styled element where an existing atom would do.

### Other folder conventions

- **Routes** (`src/routes/`) stay thin: a `load` function and/or a call into a service from an event handler, plus composition of organisms/molecules. Break a route into smaller components instead of one large `+page.svelte`. Route folders mirror the domain (`schools/`, `schools/[id]/`, `schools/[id]/edit/`), following SvelteKit's own `+page.svelte`/`+page.ts`/`[id]` conventions exactly.
- **`services/api/`** — one named service object per resource (`schoolsService`, `classesService`), both going through the shared `apiClient.ts` wrapper. Nothing outside `services/api/` calls `fetch` directly.
- **`stores/`** — shared reactive state as Svelte 5 runes in `*.svelte.ts` modules (one file per concern, e.g. `schoolsFilter.svelte.ts`), not the legacy `writable`/`readable` API.
- **`utils/`** — pure helper functions, named exports only, no default exports.
- **`types/`** — domain types shared across more than one feature (`School`, `SchoolClass`), matching the API/`db.json` shape. A feature-local view-model type (e.g. form values that don't map 1:1 to the API) belongs in `features/<feature>/types.ts` instead.
- **`constants/`** — cross-cutting constants (route paths, query keys). A constant used by a single feature belongs in that feature's own `constants.ts`, not here.
- **Tests are colocated**, not in a parallel test tree: a unit test sits right next to what it covers (`atoms/Button.svelte.test.ts` next to `atoms/Button.svelte`). E2E specs live under top-level `e2e/`, mirroring the route tree.
- Prefer **one component per file**, filename in PascalCase matching the component (`SchoolCard.svelte`), with a `<ComponentName>Props` interface declared above the `$props()` call.

## Graphify (consult before every task)

This repo keeps a local knowledge graph at `graphify-out/` (gitignored — regenerate locally, never commit it). The graph must cover **both** this SvelteKit app **and** the reference UI so queries can answer structure / screen / component questions.

### Corpus

| Path                                                                                                             | Role                                    |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `.` (this repo, including `docs/` and `src/`)                                                                    | Implementation source of truth          |
| `reference/school-management-app` (symlink) or `/Users/gabrieldemenezesnogueira/Downloads/School Management App` | UI structure to mimic (React prototype) |

### Before non-trivial work

1. Ensure the reference symlink exists (see **Reference UI** above).
2. If `graphify-out/graph.json` is missing or stale after pulling reference changes, rebuild / merge (commands below).
3. Run `graphify query "<question>"` first instead of grepping cold. Use `graphify path "<A>" "<B>"` and `graphify explain "<concept>"` as needed.
4. If `graphify-out/wiki/index.md` exists, use it for broad navigation.
5. Read `graphify-out/GRAPH_REPORT.md` only for a broad architecture pass.

Example queries: `"SchoolsView SearchBar"`, `"ConfirmModal delete school"`, `"design system badge"`, `"AppHeader navigation"`.

### Build / refresh (include reference)

```sh
ln -sfn "/Users/gabrieldemenezesnogueira/Downloads/School Management App" reference/school-management-app
graphify update .
graphify update "reference/school-management-app" --no-cluster
graphify merge-graphs graphify-out/graph.json "reference/school-management-app/graphify-out/graph.json" --out graphify-out/graph.json
```

If the symlink is missing, point the second `update` / merge at the absolute Downloads path instead.

- First-time full build of this repo alone: `graphify update .` (or `/graphify .`).
- **After modifying this repo’s code**, run `graphify update .` (incremental, AST-only for `.ts` / `.svelte`).
- **After the reference UI changes**, re-run the reference `update` + `merge-graphs` steps so the merged `graphify-out/graph.json` stays current.

Do not commit `graphify-out/` or `reference/` (both gitignored).
