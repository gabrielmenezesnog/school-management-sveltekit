import { defineConfig, devices } from '@playwright/test';

const PLAYWRIGHT_PREVIEW_PORT = 4173;
const PLAYWRIGHT_API_PORT = 3001;
const PLAYWRIGHT_HOST = 'localhost';

export default defineConfig({
	testMatch: '**/*.e2e.{ts,js}',
	fullyParallel: false,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	use: {
		baseURL: `http://${PLAYWRIGHT_HOST}:${PLAYWRIGHT_PREVIEW_PORT}`,
		trace: 'on-first-retry',
		...devices['Desktop Chrome']
	},
	webServer: [
		{
			command: 'pnpm run json-server',
			url: `http://${PLAYWRIGHT_HOST}:${PLAYWRIGHT_API_PORT}/schools`,
			reuseExistingServer: !process.env.CI,
			timeout: 120_000
		},
		{
			command: `pnpm run build && pnpm exec vite preview --host ${PLAYWRIGHT_HOST} --port ${PLAYWRIGHT_PREVIEW_PORT}`,
			url: `http://${PLAYWRIGHT_HOST}:${PLAYWRIGHT_PREVIEW_PORT}/schools`,
			reuseExistingServer: !process.env.CI,
			timeout: 180_000
		}
	]
});
