const { test, expect } = require('@playwright/test');
const { startCheckout, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test.describe('Checkout information validation', () => {
  test.beforeEach(async ({ page }) => {
    await startCheckout(page);
  });

  test('Checkout requires each mandatory field', async ({ page }) => {
    const error = page.locator('[data-test="error"]');
    await page.locator('[data-test="continue"]').click();
    await expect(error).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="continue"]').click();
    await expect(error).toContainText('Last Name is required');

    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="continue"]').click();
    await expect(error).toContainText('Postal Code is required');
  });

  test('Checkout rejects invalid name and postal data', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('!@#');
    await page.locator('[data-test="lastName"]').fill('$%^');
    await page.locator('[data-test="postalCode"]').fill('???');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText(/invalid|valid/i);
  });
});
