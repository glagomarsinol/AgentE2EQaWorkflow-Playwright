const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  continueToOverview,
  installCleanupHook,
  login,
  openCheckout,
} = require('./checkout-helpers');

test.describe('Order completion', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
    await openCheckout(page);
    await continueToOverview(page);
  });

  installCleanupHook(test);

  test('Finishing an order confirms purchase clears cart and allows return home', async ({ page }) => {
    // 1. Finish the order and verify confirmation and cleared cart.
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);

    // 2. Return to the product listing.
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  });
});
