# gerencie.me

Web application for managing public schools and their classes for a city education department. Replaces spreadsheet-based control with a SvelteKit app backed by a mock REST API.

Product name: **gerencie.me**.

## Status

Schools and classes management are implemented end to end for the challenge scope.

**In place today**

- App shell: sticky `AppHeader`, skip link, `/` → `/schools`
- Design tokens + Tailwind CSS v4 theme (`src/app.css`) and shadcn-svelte atoms
- Schools list with search, type/status filters, pagination, and skeleton loading
- School create / edit / delete (Superforms + Zod dialogs, confirm delete, toasts)
- School detail (`/schools/[id]`) with `SchoolCard` and classes table
- Class create / edit / delete on school detail (Superforms + Zod dialogs, confirm delete, toasts)
- Soft-fail empty state when json-server is unavailable; detail error page
- Unit tests (Vitest) and schools/classes CRUD E2E (Playwright)

## Tech stack

| Layer           | Choice                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| App             | [SvelteKit](https://svelte.dev/docs/kit) `^2.63` + [Svelte 5](https://svelte.dev/docs/svelte/what-are-runes) (runes) |
| Language        | [TypeScript](https://www.typescriptlang.org/) (strict)                                                               |
| Markup / styles | HTML5 + [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn-svelte](https://www.shadcn-svelte.com/)                |
| Forms           | [Zod](https://zod.dev/) + [sveltekit-superforms](https://superforms.rocks/)                                          |
| Icons           | [`@lucide/svelte`](https://lucide.dev/)                                                                              |
| Mock API        | [json-server](https://github.com/typicode/json-server) `0.17.4`                                                      |
| Unit tests      | [Vitest](https://vitest.dev/)                                                                                        |
| E2E tests       | [Playwright](https://playwright.dev/)                                                                                |
| Quality         | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                                                     |
| Package manager | [pnpm](https://pnpm.io/)                                                                                             |
| Version control | Git                                                                                                                  |

Full library decisions (forms, skeleton loading, CI, and more): [`base-project.md`](./docs/base-project.md).

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+ (`corepack enable` or `npm install -g pnpm`)

## Installation

```sh
pnpm install
```

## Running locally

The app and the mock API are separate processes. Run both.

**Terminal 1 — mock API (json-server)**

```sh
pnpm run json-server
```

Serves [`db.json`](./db.json) at `http://localhost:3001`:

| Method                         | Endpoint                        |
| ------------------------------ | ------------------------------- |
| `GET`, `POST`, `PUT`, `DELETE` | `http://localhost:3001/schools` |
| `GET`, `POST`, `PUT`, `DELETE` | `http://localhost:3001/classes` |

**Terminal 2 — SvelteKit app**

```sh
pnpm run dev
```

Open `http://localhost:5173` (redirects to `/schools`), or:

```sh
pnpm run dev -- --open
```

## Scripts

| Command                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `pnpm run dev`         | SvelteKit development server (`http://localhost:5173`)    |
| `pnpm run json-server` | Mock REST API from `db.json` (`http://localhost:3001`)    |
| `pnpm run build`       | Production build                                          |
| `pnpm run preview`     | Preview the production build (`http://localhost:4173`)    |
| `pnpm run check`       | `svelte-kit sync` + `svelte-check` (TypeScript)           |
| `pnpm run lint`        | Prettier check + ESLint                                   |
| `pnpm run format`      | Prettier write                                            |
| `pnpm run test:unit`   | Vitest unit tests                                         |
| `pnpm run test:e2e`    | Install Playwright browsers (first run) and run E2E tests |
| `pnpm run test`        | Unit tests (run mode) then E2E tests                      |

## Production build

```sh
pnpm run build
pnpm run preview
```

Deploy with a SvelteKit [adapter](https://svelte.dev/docs/kit/adapters) that matches the host. The scaffold uses `@sveltejs/adapter-auto`.

## Tests

**Unit (Vitest)**

```sh
pnpm run test:unit
```

Colocated next to source as `*.test.ts` / `*.spec.ts` under `src/`.

**E2E (Playwright)**

```sh
pnpm run test:e2e
```

Playwright starts json-server on port `3001`, builds the app, starts preview on port `4173`, and runs specs matching `**/*.e2e.{ts,js}` (see `playwright.config.ts` and `e2e/schools.e2e.ts`). Existing local servers are reused when not in CI.

**All tests**

```sh
pnpm run test
```

## Project structure

```
CLAUDE.md
README.md
db.json
docs/
  code-rules.md
  base-project.md
  design-system.md
e2e/
  schools.e2e.ts
  classes.e2e.ts
src/
  app.css
  lib/
    components/
      atoms/                 shadcn primitives (Button, Dialog, Card, …)
      molecules/             FormField, ConfirmDialog, SchoolCard, …
      organisms/             SchoolsTable, SchoolForm, AppHeader, …
    features/
      schools/               form schema, filters, delete cascade, …
      classes/               labels, class counts, …
    services/api/            apiClient, schoolsService, classesService
    utils/                   cn, formatPhone, toast, …
    types/                   School, SchoolClass, …
  routes/
    +layout.svelte           skip link + AppHeader + Toaster
    +page.ts                 redirect / → /schools
    schools/
      +page.svelte           schools list + CRUD dialogs
      +page.ts               load schools (soft-fail if API down)
      +error.svelte
      [id]/
        +page.svelte         school detail + classes table
        +page.ts
playwright.config.ts
vite.config.ts
package.json
```

Atomic design and folder conventions: [`CLAUDE.md`](./CLAUDE.md).

## Documentation

| Doc                                                | Purpose                                                         |
| -------------------------------------------------- | --------------------------------------------------------------- |
| [`CLAUDE.md`](./CLAUDE.md)                         | Project rules entry point for agents                            |
| [`docs/code-rules.md`](./docs/code-rules.md)       | Coding conventions and verification                             |
| [`docs/base-project.md`](./docs/base-project.md)   | Technology and library decisions                                |
| [`docs/design-system.md`](./docs/design-system.md) | Typography, color, components, motion (canonical visual system) |
