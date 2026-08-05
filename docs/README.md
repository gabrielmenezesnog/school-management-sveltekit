# school-management-sveltekit

Web application for managing public schools and their classes for a city education department. Replaces spreadsheet-based control with a SvelteKit app backed by a mock REST API.

## Features

- List schools
- Create, edit, and delete schools
- Search and filter schools
- List classes by school
- Create, edit, and delete classes

## Tech stack

| Layer | Choice |
| --- | --- |
| App | [SvelteKit](https://svelte.dev/docs/kit) `^2.63` + [Svelte 5](https://svelte.dev/docs/svelte/what-are-runes) (runes) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict) |
| Markup / styles | HTML5, CSS3 (Tailwind CSS v4 + shadcn-svelte — see [`base-project.md`](./base-project.md)) |
| Mock API | [json-server](https://github.com/typicode/json-server) `0.17.4` |
| Unit tests | [Vitest](https://vitest.dev/) |
| E2E tests | [Playwright](https://playwright.dev/) |
| Quality | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) |
| Package manager | [pnpm](https://pnpm.io/) |
| Version control | Git |

Full library decisions (icons, forms, skeleton loading, CI, and more): [`base-project.md`](./base-project.md).

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

| Method | Endpoint |
| --- | --- |
| `GET`, `POST`, `PUT`, `DELETE` | `http://localhost:3001/schools` |
| `GET`, `POST`, `PUT`, `DELETE` | `http://localhost:3001/classes` |

**Terminal 2 — SvelteKit app**

```sh
pnpm run dev
```

Open `http://localhost:5173`, or:

```sh
pnpm run dev -- --open
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm run dev` | SvelteKit development server (`http://localhost:5173`) |
| `pnpm run json-server` | Mock REST API from `db.json` (`http://localhost:3001`) |
| `pnpm run build` | Production build |
| `pnpm run preview` | Preview the production build (`http://localhost:4173`) |
| `pnpm run check` | `svelte-kit sync` + `svelte-check` (TypeScript) |
| `pnpm run lint` | Prettier check + ESLint |
| `pnpm run format` | Prettier write |
| `pnpm run test:unit` | Vitest unit tests |
| `pnpm run test:e2e` | Install Playwright browsers (first run) and run E2E tests |
| `pnpm run test` | Unit tests (run mode) then E2E tests |

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
CLAUDE.md                 agent entry — points to docs/
db.json                   mock API data (/schools, /classes)
docs/
  README.md               this file
  code-rules.md           TypeScript / Svelte / verification rules
  base-project.md         stack and library decisions
  design-system.md        visual design system
src/
  app.d.ts
  app.html
  lib/                    shared modules
  routes/                 SvelteKit routes (+layout, +page)
static/                   static assets
playwright.config.ts      E2E config (specs: **/*.e2e.{ts,js})
vite.config.ts            Vite + Vitest + SvelteKit (runes forced)
package.json
```

Target feature layout (atomic design, `services/`, `e2e/`) is described in [`../CLAUDE.md`](../CLAUDE.md).

## Documentation

| Doc | Purpose |
| --- | --- |
| [`../CLAUDE.md`](../CLAUDE.md) | Project rules entry point for agents |
| [`code-rules.md`](./code-rules.md) | Coding conventions and verification |
| [`base-project.md`](./base-project.md) | Technology and library decisions |
| [`design-system.md`](./design-system.md) | Typography, color, components, motion |
