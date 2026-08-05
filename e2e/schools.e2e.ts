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

test.describe('Schools search and filters', () => {
	test('narrows results by search text and by type/status filters', async ({ page }) => {
		const schoolName = `E2E Filter School ${Date.now()}`;
		const principalName = `E2E Filter Principal ${Date.now()}`;
		const viewClassesButton = () =>
			page.getByRole('button', { name: `View classes for ${schoolName}` });

		await page.goto('/schools');

		const schoolFormDialog = page.getByRole('dialog', { name: 'New school' });
		const filterCard = page.getByRole('region', { name: 'School filters' });

		await page.getByRole('button', { name: 'New school' }).click();
		await fillRequiredSchoolFields(page, schoolName);
		await page.getByRole('textbox', { name: 'Principal' }).fill(principalName);
		await schoolFormDialog.getByRole('button', { name: 'School type' }).click();
		await page.getByRole('option', { name: 'Federal' }).click();
		await schoolFormDialog.getByRole('button', { name: 'Status', exact: true }).click();
		await page.getByRole('option', { name: 'Inactive', exact: true }).click();
		await schoolFormDialog.getByRole('button', { name: 'Create school' }).click();
		await expect(page.getByText(`${schoolName} created successfully.`)).toBeVisible();

		const searchBox = page.getByRole('searchbox');

		await searchBox.fill(schoolName);
		await expect(viewClassesButton()).toBeVisible();

		await searchBox.fill(principalName);
		await expect(viewClassesButton()).toBeVisible();

		await searchBox.fill('no-school-matches-this-query');
		await expect(page.getByText('No schools found')).toBeVisible();
		await expect(viewClassesButton()).toHaveCount(0);

		await searchBox.fill(schoolName);
		await expect(viewClassesButton()).toBeVisible();

		await filterCard.getByRole('button', { name: 'Type', exact: true }).click();
		await page.getByRole('option', { name: 'Municipal' }).click();
		await expect(page.getByText('No schools found')).toBeVisible();

		await filterCard.getByRole('button', { name: 'Type', exact: true }).click();
		await page.getByRole('option', { name: 'Federal' }).click();
		await expect(viewClassesButton()).toBeVisible();

		await filterCard.getByRole('button', { name: 'Status', exact: true }).click();
		await page.getByRole('option', { name: 'Active', exact: true }).click();
		await expect(page.getByText('No schools found')).toBeVisible();

		await filterCard.getByRole('button', { name: 'Status', exact: true }).click();
		await page.getByRole('option', { name: 'Inactive', exact: true }).click();
		await expect(viewClassesButton()).toBeVisible();

		await page.getByRole('button', { name: `Delete ${schoolName}` }).click();
		await page.getByRole('button', { name: 'Delete', exact: true }).click();
		await expect(page.getByText(`${schoolName} deleted successfully.`)).toBeVisible();
	});
});
