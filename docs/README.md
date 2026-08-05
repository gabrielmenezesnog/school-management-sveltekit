# gerencie.me

Web application for managing public schools and their classes for a city education department. Replaces spreadsheet-based control with a SvelteKit app backed by a mock REST API.

Product name: **gerencie.me**.

## Status

Scaffold + app shell in progress. Schools/classes CRUD from the challenge brief is still being built on top of this foundation.

**In place today**

- App shell: sticky `AppHeader`, skip link, `/` → `/schools`
- Design tokens + Tailwind CSS v4 theme (`src/app.css`)
- Schools landing placeholder (`/schools`)
- Brand, routes, and path helpers under `src/lib/`

**Planned (challenge scope)**

- List / create / edit / delete schools
- Search and filter schools
- List / create / edit / delete classes by school

## Tech stack

| Layer           | Choice                                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| App             | [SvelteKit](https://svelte.dev/docs/kit) `^2.63` + [Svelte 5](https://svelte.dev/docs/svelte/what-are-runes) (runes)       |
| Language        | [TypeScript](https://www.typescriptlang.org/) (strict)                                                                     |
| Markup / styles | HTML5 + [Tailwind CSS v4](https://tailwindcss.com/) (+ shadcn-svelte planned — see [`base-project.md`](./base-project.md)) |
| Icons           | [`@lucide/svelte`](https://lucide.dev/)                                                                                    |
| Mock API        | [json-server](https://github.com/typicode/json-server) `0.17.4`                                                            |
| Unit tests      | [Vitest](https://vitest.dev/)                                                                                              |
| E2E tests       | [Playwright](https://playwright.dev/)                                                                                      |
| Quality         | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                                                           |
| Package manager | [pnpm](https://pnpm.io/)                                                                                                   |
| Version control | Git                                                                                                                        |

Full library decisions (forms, skeleton loading, CI, and more): [`base-project.md`](./base-project.md).

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

Serves [`db.json`](../db.json) at `http://localhost:3001`:

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

Playwright builds the app, starts preview on port `4173`, and runs specs matching `**/*.e2e.{ts,js}` (see `playwright.config.ts`).

**All tests**

```sh
pnpm run test
```

## Project structure

```
CLAUDE.md                              agent entry — points to docs/
db.json                                mock API data (/schools, /classes)
docs/
  README.md                            this file
  code-rules.md                        TypeScript / Svelte / styling / responsive / a11y
  base-project.md                      stack and library decisions
  design-system.md                     visual design system
src/
  app.css                              Tailwind v4 + design tokens
  app.d.ts
  app.html
  lib/
    components/organisms/AppHeader.svelte
    constants/                         routes, brand copy
    utils/                             cn(), path helpers (+ tests)
  routes/
    +layout.svelte                     skip link + AppHeader + main
    +page.ts                           redirect / → /schools
    schools/+page.svelte               schools landing (placeholder)
static/
playwright.config.ts
vite.config.ts                         Vite + Vitest + SvelteKit (runes) + Tailwind
package.json
```

Target feature layout (atomic design, `services/`, `e2e/`) is described in [`../CLAUDE.md`](../CLAUDE.md).

## Documentation

| Doc                                      | Purpose                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| [`../CLAUDE.md`](../CLAUDE.md)           | Project rules entry point for agents                            |
| [`code-rules.md`](./code-rules.md)       | Coding conventions and verification                             |
| [`base-project.md`](./base-project.md)   | Technology and library decisions                                |
| [`design-system.md`](./design-system.md) | Typography, color, components, motion (canonical visual system) |
