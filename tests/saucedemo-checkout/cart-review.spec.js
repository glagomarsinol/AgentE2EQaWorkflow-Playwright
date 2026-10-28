const { test, expect } = require('@playwright/test');
const { BACKPACK, login, addBackpackToCart, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test.describe('Cart review', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await addBackpackToCart(page);
  });

  test('Cart review displays product details and checkout actions', async ({ page }) => {
    const item = page.locator('.cart_item').filter({ hasText: BACKPACK });
    await expect(item).toContainText(BACKPACK);
    await expect(item.locator('.cart_quantity')).toHaveText('1');
    await expect(item.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect(item).toContainText('carry.allTheThings()');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.getByText(/total/i)).toBeVisible();
  });
});
