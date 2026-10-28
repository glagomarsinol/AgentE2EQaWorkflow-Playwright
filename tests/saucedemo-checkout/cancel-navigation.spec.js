const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  continueToOverview,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Checkout cancellation navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
  });

  installCleanupHook(test);

  test('Cancel from checkout information returns to the cart', async ({ page }) => {
    // 1. Cancel before entering checkout information.
    await page.getByTestId('cancel').click();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });

  test('Cancel from order overview returns to the cart', async ({ page }) => {
    // 1. Complete checkout information and continue to overview.
    await continueToOverview(page);

    // 2. Cancel the order and verify the cart destination and contents.
    await page.getByTestId('cancel').click();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });
});
