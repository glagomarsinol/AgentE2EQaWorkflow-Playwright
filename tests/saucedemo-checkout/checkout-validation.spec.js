const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Checkout information validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
  });

  installCleanupHook(test);

  test('Checkout information requires each mandatory field', async ({ page }) => {
    // 1. Submit with all required fields blank.
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');

    // 2. Enter only a first name and submit.
    await page.getByTestId('firstName').fill('Ada');
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('Last Name is required');

    // 3. Enter a last name but leave the postal code blank.
    await page.getByTestId('lastName').fill('Lovelace');
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
  });

  test('Checkout rejects invalid name and postal data', async ({ page }) => {
    // 1. Fill all fields with malformed values.
    await page.getByTestId('firstName').fill('!@#');
    await page.getByTestId('lastName').fill('$%^');
    await page.getByTestId('postalCode').fill('???');

    // 2. The invalid values should be rejected rather than advancing.
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
