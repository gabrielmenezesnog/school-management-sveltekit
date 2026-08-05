import { expect, test, type Page } from '@playwright/test';

const E2E_CLASS_NAME = `E2E Class ${Date.now()}`;
const E2E_CLASS_UPDATED_NAME = `${E2E_CLASS_NAME} Updated`;

async function openFirstSchoolDetail(page: Page): Promise<void> {
	await page.goto('/schools');
	await expect(page.getByRole('heading', { name: 'Schools', level: 1 })).toBeVisible();

	const viewButton = page.getByRole('button', { name: /View classes for/ }).first();
	await expect(viewButton).toBeVisible();
	await viewButton.click();
	await expect(page.getByRole('heading', { name: 'Classes', level: 2 })).toBeVisible();
}

async function fillRequiredClassFields(page: Page, className: string): Promise<void> {
	await page.getByRole('textbox', { name: 'Class name' }).fill(className);
	await page.getByRole('textbox', { name: 'Grade' }).fill('1st year');
	await page.getByRole('textbox', { name: 'Teacher' }).fill('E2E Teacher');
	await page.getByRole('spinbutton', { name: 'Students' }).fill('25');
}

test.describe('Classes CRUD', () => {
	test('creates, edits, and deletes a class on school detail', async ({ page }) => {
		await openFirstSchoolDetail(page);

		await page.getByRole('button', { name: 'New class' }).first().click();
		await expect(page.getByRole('heading', { name: 'New class' })).toBeVisible();

		await fillRequiredClassFields(page, E2E_CLASS_NAME);
		await page.getByRole('button', { name: 'Create class' }).click();

		await expect(page.getByText(`${E2E_CLASS_NAME} created successfully.`)).toBeVisible();
		await expect(page.getByText(E2E_CLASS_NAME, { exact: true })).toBeVisible();

		await page.getByRole('button', { name: `Edit ${E2E_CLASS_NAME}` }).click();
		await expect(page.getByRole('heading', { name: 'Edit class' })).toBeVisible();
		await page.getByRole('textbox', { name: 'Class name' }).fill(E2E_CLASS_UPDATED_NAME);
		await page.getByRole('button', { name: 'Save changes' }).click();

		await expect(page.getByText(`${E2E_CLASS_UPDATED_NAME} updated successfully.`)).toBeVisible();
		await expect(page.getByText(E2E_CLASS_UPDATED_NAME, { exact: true })).toBeVisible();

		await page.getByRole('button', { name: `Delete ${E2E_CLASS_UPDATED_NAME}` }).click();
		await expect(
			page.getByRole('heading', { name: `Delete "${E2E_CLASS_UPDATED_NAME}"?` })
		).toBeVisible();
		await page.getByRole('button', { name: 'Delete', exact: true }).click();

		await expect(page.getByText(`${E2E_CLASS_UPDATED_NAME} deleted successfully.`)).toBeVisible();
		await expect(page.getByText(E2E_CLASS_UPDATED_NAME, { exact: true })).toHaveCount(0);
	});
});
