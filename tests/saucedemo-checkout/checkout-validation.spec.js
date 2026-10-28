const { test, expect } = require('@playwright/test');
const { startCheckout } = require('./checkout-helpers');

test.describe('checkout information validation', () => {
  test('requires first name, last name, and postal code', async ({ page }) => {
    await startCheckout(page);

    await page.getByTestId('continue').click();
    await expect(page.getByTestId('error')).toContainText('First Name is required');

    await page.getByTestId('firstName').fill('Ada');
    await page.getByTestId('continue').click();
    await expect(page.getByTestId('error')).toContainText('Last Name is required');

    await page.getByTestId('lastName').fill('Lovelace');
    await page.getByTestId('continue').click();
    await expect(page.getByTestId('error')).toContainText('Postal Code is required');
  });

  test('rejects invalid name and postal data', async ({ page }) => {
    await startCheckout(page);

    await page.getByTestId('firstName').fill('!@#');
    await page.getByTestId('lastName').fill('$%^');
    await page.getByTestId('postalCode').fill('???');
    await page.getByTestId('continue').click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(page.getByTestId('error')).toBeVisible();
  });
});
