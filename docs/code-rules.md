# Code Rules

These rules apply to every change in this project. Entry point / project overview / Graphify usage live in [`../CLAUDE.md`](../CLAUDE.md). Other docs live in this [`docs/`](./) folder.

## TypeScript

- Never use `any`, `unknown`, or `never` as an explicit type. If a `catch` clause is inferred as `unknown` under `strict` mode, narrow it immediately (`error instanceof Error`) instead of casting it away or leaving it untyped.
- Never use inline object/function types. Always a named, exported type definition.
  ```ts
  // Bad
  function renderSchool(school: { id: string; name: string }): string { ... }

  // Good
  export interface SchoolSummary {
    id: string;
    name: string;
  }
  function renderSchool(school: SchoolSummary): string { ... }
  ```
- All functions must be named and have an explicit return type. Never pass an anonymous function where a named one belongs.
  ```ts
  // Bad
  const handleClick = () => { ... };

  // Good
  function handleClick(): void { ... }
  ```
- Type Svelte 5 runes explicitly — never let them fall back to a widened/inferred `any`-ish shape:
  ```ts
  // Bad
  let schools = $state([]);

  // Good
  let schools = $state<School[]>([]);
  ```
- Any reusable stateful module (a `.svelte.ts` file exporting rune-based state/logic) returns a typed object whose shape is an exported interface, e.g. `export interface UseSchoolsReturn { ... }`.

## Svelte 5 / SvelteKit conventions

- **Runes only.** No Svelte 4 patterns:
  - No `export let foo` — use typed destructured `$props()`.
  - No `$: derived = ...` reactive statements — use `$derived`.
  - No manual `onMount` + `fetch` for initial page data — use a `+page.ts`/`+layout.ts` `load` function; reserve `$effect` for real side effects (subscriptions, DOM/measurement, logging), not for deriving state that `$derived` could express.
- **Typed props**, declared as a named interface directly above the destructure:
  ```svelte
  <script lang="ts">
    interface SchoolCardProps {
      school: School;
      onSelect: (id: string) => void;
    }

    let { school, onSelect }: SchoolCardProps = $props();
  </script>
  ```
- **`load` functions:** prefer universal `+page.ts`/`+layout.ts` `load` over `+page.server.ts` unless the task genuinely needs server-only capability (secrets, filesystem, cookies) — there's no auth/session here, so a server-only load is rarely justified.
- **File/route naming** follows SvelteKit conventions exactly: `+page.svelte`, `+page.ts`, `+layout.svelte`, dynamic segments as `[id]` folders. Don't invent alternate naming for these.
- **Shared reactive state** lives in `src/lib/stores/*.svelte.ts` using runes (`$state` at module scope inside a `.svelte.ts` file, or a factory function returning rune-backed state). Don't reach for the legacy `writable`/`readable` from `svelte/store` for new state unless integrating with an API that specifically requires the store contract.
- **No inline function bodies in event attributes.** Extract any handler with real logic into a named function in the component's `<script>` block:
  ```svelte
  <!-- Bad -->
  <button onclick={() => { const next = computeNext(item); saveItem(next); }}>Save</button>

  <!-- Good -->
  <script lang="ts">
    function handleSave(item: SchoolClass): void {
      const next = computeNext(item);
      saveItem(next);
    }
  </script>
  <button onclick={() => handleSave(item)}>Save</button>
  ```

## Code style

- **Comments are forbidden (absolute).** Semantic, readable code does not need comments — good code is understandable from names and structure alone. Any kind of comment is banned with no exceptions: "why", workarounds, TODOs, FIXMEs, NOTES, doc comments on implementation, block comments, line comments, or Svelte markup comments (`<!-- -->`). If a block is unclear, rename, extract, or restructure it; never paper over it with a comment. When you touch a region that already has comments, remove them as part of the change.
- **No blank or no-op `if` blocks:** never write an `if`/`else if` whose body is empty or would become empty once comments are removed. Omit branches that intentionally do nothing — invert the condition or use an early return instead.
- Use semantic, readable names following clean-code principles. Names carry the meaning that comments would otherwise try to explain.
- Spacing between blocks: leave a blank line between `const` declarations and the `if`/`return` block that follows.
- Always use collapsible `if` statements with braces. No inline ifs.
  ```ts
  // Bad
  if (condition) doSomething();

  // Good
  if (condition) {
    doSomething();
  }
  ```
- Boolean variables and functions must use semantic prefixes: `is`, `has`, `should`, `can`, `will`, `did`.
- No magic numbers. Extract them into named constants.
- **Regex literals must be extracted into a named, semantic constant** — never written inline inside a `.replace()`/`.match()`/`.test()` call.
  ```ts
  // Bad
  value.replace(/_/g, ' ').replace(/^./, (char) => char.toUpperCase());

  // Good
  const SNAKE_CASE_UNDERSCORE_REGEX = /_/g;
  const FIRST_CHARACTER_REGEX = /^./;

  value
    .replace(SNAKE_CASE_UNDERSCORE_REGEX, ' ')
    .replace(FIRST_CHARACTER_REGEX, (char) => char.toUpperCase());
  ```
- Simplify null/undefined/empty checks — no explicit comparisons.
  ```ts
  // Bad
  if (schoolId !== undefined && schoolId !== null && schoolId !== '')

  // Good
  if (schoolId)
  ```
- **No single-use display-string constants.** Static copy rendered in exactly one place (a heading, a button label, an empty-state message) stays inline in the markup — don't hoist it into a top-level `const TITLE = '...'`. Only extract a string when it's genuinely reused elsewhere or is a non-display identifier (a key, a route, a namespace). The "no magic numbers" rule does not extend to human-readable copy.

## Constants and shared values

- Shared constants (routes, storage keys, enums, query params) live in `src/lib/constants/`, never inside a component file.
- A constant used by more than one feature must not live in the scope of a single component or feature folder.

## Components

- Follow atomic design for reusable UI: **atoms → molecules → organisms**, under the global `src/lib/components/` folders (see [`../CLAUDE.md`](../CLAUDE.md) for the full tree). Routes compose these; they don't redefine them locally.
- When a route grows past simple composition, break it into smaller components instead of one large `+page.svelte`.
- Declare handler functions in the `<script>` block, above the markup — never inline complex logic in template bindings.
- Before creating something new, check `src/lib/components/` for an existing atom/molecule that already fits — don't duplicate.
- If the same table/grid markup is about to be written a second time, extract it into a shared molecule/organism instead of copy-pasting.

## Services, stores, utils

- API calls live in service objects under `src/lib/services/api/`, one per resource, exported as a named object: `export const schoolsService = { list, get, create, update, remove };`. Don't call `fetch` directly from a component, route, or `load` function.
- All service functions go through a single shared fetch wrapper (e.g. `src/lib/services/api/apiClient.ts`) that owns the base URL, JSON parsing, and error normalization — don't build ad-hoc `fetch(...)` calls per service function.
- The json-server base URL is an env var (SvelteKit public env, e.g. `PUBLIC_API_BASE_URL`), never a hardcoded `http://localhost:3001` string in application code.
- Utilities live in `src/lib/utils/` as named exports. No default exports for utility files.
- Rune-based state modules (`src/lib/stores/*.svelte.ts`) return a typed object whose shape is a named exported interface.

## Error handling

- Never parse or interpret an API error response inline inside a component or route. No ad-hoc patterns like:
  ```ts
  // Bad
  const body = await response.json();
  alert(body.message ?? 'Something went wrong');
  ```
- Extract this into a reusable utility under `src/lib/utils/` (e.g. `getApiErrorMessage`) that handles body parsing and produces a display-ready message. Components/routes call the utility and render the result — they don't parse response bodies themselves.

## Accessibility (WCAG 2.2 Level AA — mandatory)

Accessibility is a **main focus** of this project, equal to correct features and readable code. Target: **WCAG 2.2 Level AA**. Visual contrast and status patterns also live in [`design-system.md`](./design-system.md) §17. SvelteKit provides route announcements and focus reset after navigation; we still own accessible markup and widgets.

### Semantics and structure

- Use real HTML elements for their meaning: `<main>`, `<nav>`, `<header>`, `<footer>`, `<h1>`–`<h3>`, `<button>`, `<a href="...">`, `<table>` / `<th scope>`, `<label>`, `<fieldset>` / `<legend>` when grouping related controls.
- One logical `<h1>` per page; do not skip heading levels.
- Prefer native controls over `div`/`span` with click handlers. If a custom widget is required, use shadcn-svelte / Bits UI (already accessible) — do not hand-roll dialogs, menus, or selects.
- Decorative icons must be hidden from assistive tech (`aria-hidden="true"`). Icon-only buttons need an accessible name (`aria-label` or visually associated text).

### Forms and feedback

- Every input has a visible `<label>` associated via `for`/`id` or wrapping.
- Errors are tied to fields (`aria-describedby` / `aria-invalid`) and announced; do not rely on color alone for error or status.
- Destructive actions (delete) require a clear accessible confirmation (dialog with labelled actions and focus trap — use shadcn `dialog`).

### Keyboard and focus

- Every interactive control is reachable and operable with the keyboard alone (Tab, Enter/Space, Escape for dismissible overlays).
- Focus order follows visual reading order. Never use `tabindex` greater than `0`.
- Visible focus indicators must remain (do not remove outline without an equivalent).
- After client navigations, rely on SvelteKit’s focus management; each page must set a unique descriptive `<title>` via `<svelte:head>` so route announcements work.
- Avoid `autofocus` except when a strong UX case exists and keyboard users are not harmed.

### Perception

- Text contrast: at least **4.5:1** for body text, **3:1** for large text / UI chrome — use design-system tokens only.
- Do not convey meaning with color alone (pair with text, icon + text, or pattern).
- Hit targets should be large enough for pointer and touch (follow design-system spacing / control sizes).
- Honor `prefers-reduced-motion`: no essential information only in motion; keep transitions subtle or disable when reduced motion is requested.

### Svelte compiler a11y

- Treat Svelte `a11y_*` compile warnings as **blockers** for UI work — fix the markup.
- Do **not** use `<!-- svelte-ignore a11y_... -->` (also banned by the no-comments rule). Restructure to semantic elements instead.
- Run `svelte-autofixer` (Svelte MCP) on new/changed `.svelte` files and clear a11y findings before done.

### Testing accessibility

- Playwright E2E locators prefer `getByRole` / accessible name over CSS or test ids.
- E2E flows for CRUD must be completable with keyboard-oriented interactions where practical.
- When verifying UI with the Playwright MCP, check that controls expose roles and names in the accessibility snapshot.
- Unit/component tests for interactive molecules/organisms should assert accessible names where relevant.

## Testing

- Unit tests (Vitest) are colocated with the code they cover: `foo.test.ts` for plain logic, `Foo.svelte.test.ts` for component/rune behavior. `vite.config.ts` requires every test to contain an assertion (`expect: { requireAssertions: true }`) — a test with no `expect()` call fails the run by design; don't write placeholder tests without one.
- E2E tests (Playwright) live under `e2e/`, mirroring the route tree, named `*.e2e.ts` (matches `playwright.config.ts`'s `testMatch`). Prefer role-based locators (`getByRole`) so tests reinforce accessibility.
- Test behavior (what the user sees/can do), not implementation details — don't assert on internal store shape from an E2E test, and don't reach into component internals from a unit test when a public prop/return value already expresses the same thing.

## Verification (MANDATORY — run at the end of every change)

**This is a hard gate, not optional. A task is NOT done until it passes. Never report a task complete without having run these and summarized their real output.**

1. **Type/template check:** `pnpm run check` (`svelte-kit sync && svelte-check --tsconfig ./tsconfig.json`). Zero errors allowed in any file you touched, including pre-existing errors in a file you modified. For UI files, resolve Svelte **`a11y_*` warnings** in touched components — do not ship or ignore them.
2. **Lint:** `pnpm run lint` (`prettier --check .` + `eslint .`). Fix every ESLint **error**; formatting issues are fixed with `pnpm run format`. Non-a11y ESLint **warnings can be ignored**; accessibility issues are never “warnings to skip.”
3. **Unit tests:** if you changed logic covered by (or that should be covered by) a unit test, run `pnpm run test:unit -- --run` and make sure it's green.
4. **Accessibility (UI changes):** confirm semantic structure and keyboard path; use Playwright MCP accessibility snapshot / role locators; run `svelte-autofixer` on changed `.svelte` files.
5. If a changed file carries a pre-existing error from `check` or `lint`, either **(a)** fix it when small and safe, or **(b)** explicitly surface it to the user — name the file, line, and error, note it's pre-existing, and ask whether to fix it or leave it. Don't silently ship a changed file with an error in it.

If a file has both errors and warnings, only the errors block "done" — except Svelte `a11y_*` warnings on files you touched, which also block "done."
