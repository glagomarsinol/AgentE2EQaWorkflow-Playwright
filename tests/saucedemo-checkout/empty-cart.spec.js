const { test, expect } = require('@playwright/test');
const { installCleanupHook, login } = require('./checkout-helpers');

test.describe('Empty cart checkout protection', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.getByTestId('shopping-cart-link').click();
  });

  installCleanupHook(test);

  test('Empty cart cannot proceed to checkout', async ({ page }) => {
    // 1. Verify the cart is empty and checkout is unavailable.
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.getByTestId('checkout')).toBeDisabled();

    // 2. Even a direct checkout URL should not allow an empty order.
    await page.goto('/checkout-step-one.html');
    await expect(page).not.toHaveURL(/checkout-step-one\.html$/);
  });
});
