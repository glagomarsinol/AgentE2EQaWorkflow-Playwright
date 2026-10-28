const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  continueToOverview,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Mobile checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
  });

  installCleanupHook(test);

  test('Checkout remains usable at a mobile viewport', async ({ page }) => {
    // 1. Verify checkout fields and actions fit the mobile viewport.
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.getByTestId('cancel')).toBeVisible();
    await expect(page.getByTestId('continue')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

    // 2. Continue to overview and verify its order actions remain usable.
    await continueToOverview(page);
    await expect(page.getByTestId('cancel')).toBeVisible();
    await expect(page.getByTestId('finish')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});
