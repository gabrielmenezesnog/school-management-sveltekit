import { expect, test, type Page } from '@playwright/test';

const E2E_SCHOOL_NAME = `E2E School ${Date.now()}`;
const E2E_SCHOOL_UPDATED_NAME = `${E2E_SCHOOL_NAME} Updated`;

async function fillRequiredSchoolFields(page: Page, schoolName: string): Promise<void> {
	await page.getByRole('textbox', { name: 'School name' }).fill(schoolName);
	await page.getByRole('textbox', { name: 'Address' }).fill('100 Test Avenue');
	await page.getByRole('textbox', { name: 'Neighborhood' }).fill('Centro');
	await page.getByRole('textbox', { name: 'City' }).fill('São Paulo');
	await page.getByRole('textbox', { name: 'Principal' }).fill('E2E Principal');
}

test.describe('Schools CRUD', () => {
	test('creates, views, edits, and deletes a school', async ({ page }) => {
		await page.goto('/schools');

		await expect(page.getByRole('heading', { name: 'Schools', level: 1 })).toBeVisible();

		await page.getByRole('button', { name: 'New school' }).click();
		await expect(page.getByRole('heading', { name: 'New school' })).toBeVisible();

		await fillRequiredSchoolFields(page, E2E_SCHOOL_NAME);
		await page.getByRole('button', { name: 'Create school' }).click();

		await expect(page.getByText(`${E2E_SCHOOL_NAME} created successfully.`)).toBeVisible();
		await page.getByRole('searchbox').fill(E2E_SCHOOL_NAME);
		await expect(
			page.getByRole('button', { name: `View classes for ${E2E_SCHOOL_NAME}` })
		).toBeVisible();

		await page.getByRole('button', { name: `View classes for ${E2E_SCHOOL_NAME}` }).click();
		await expect(page.getByRole('heading', { name: E2E_SCHOOL_NAME, level: 1 })).toBeVisible();

		await page.getByRole('link', { name: 'Schools' }).first().click();
		await page.getByRole('searchbox').fill(E2E_SCHOOL_NAME);
		await page.getByRole('button', { name: `Edit ${E2E_SCHOOL_NAME}` }).click();

		await expect(page.getByRole('heading', { name: 'Edit school' })).toBeVisible();
		await page.getByRole('textbox', { name: 'School name' }).fill(E2E_SCHOOL_UPDATED_NAME);
		await page.getByRole('button', { name: 'Save changes' }).click();

		await expect(page.getByText(`${E2E_SCHOOL_UPDATED_NAME} updated successfully.`)).toBeVisible();

		await page.getByRole('searchbox').fill(E2E_SCHOOL_UPDATED_NAME);
		await page.getByRole('button', { name: `Delete ${E2E_SCHOOL_UPDATED_NAME}` }).click();
		await expect(
			page.getByRole('heading', { name: `Delete "${E2E_SCHOOL_UPDATED_NAME}"?` })
		).toBeVisible();
		await page.getByRole('button', { name: 'Delete', exact: true }).click();

		await expect(page.getByText(`${E2E_SCHOOL_UPDATED_NAME} deleted successfully.`)).toBeVisible();
		await page.getByRole('searchbox').fill(E2E_SCHOOL_UPDATED_NAME);
		await expect(
			page.getByRole('button', { name: `View classes for ${E2E_SCHOOL_UPDATED_NAME}` })
		).toHaveCount(0);
	});
});
