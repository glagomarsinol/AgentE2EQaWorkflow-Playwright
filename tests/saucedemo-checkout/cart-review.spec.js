const { test, expect } = require('@playwright/test');
const {
  addBackpackToCart,
  installCleanupHook,
  login,
} = require('./checkout-helpers');

test.describe('Checkout and cart behavior', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
  });

  installCleanupHook(test);

  test('Cart review displays product details and checkout actions', async ({ page }) => {
    // 1. Open the cart and inspect the backpack row and available actions.
    await page.getByTestId('shopping-cart-link').click();

    await expect(page).toHaveURL(/cart\.html$/);
    const backpack = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack).toContainText('Sauce Labs Backpack');
    await expect(backpack).toContainText('carry.allTheThings()');
    await expect(backpack).toContainText('$29.99');
    await expect(backpack.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByTestId('checkout')).toBeVisible();
  });
});