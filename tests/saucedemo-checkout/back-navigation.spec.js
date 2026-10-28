const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  continueToOverview,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Checkout browser navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
  });

  installCleanupHook(test);

  test('Browser Back from overview returns to checkout information', async ({ page }) => {
    // 1. Continue to overview, then use the browser Back action.
    await continueToOverview(page);
    await page.goBack();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  });
});
