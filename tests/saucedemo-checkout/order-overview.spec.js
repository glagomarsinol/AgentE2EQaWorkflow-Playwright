const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  continueToOverview,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Order overview', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
  });

  installCleanupHook(test);

  test('Order overview shows payment shipping items and calculated totals', async ({ page }) => {
    // 1. Submit valid information to reach the order overview.
    await continueToOverview(page);

    // 2. Verify order details, payment, shipping, and price calculation.
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
    await expect(page.getByTestId('cancel')).toBeVisible();
    await expect(page.getByTestId('finish')).toBeVisible();
  });
});
