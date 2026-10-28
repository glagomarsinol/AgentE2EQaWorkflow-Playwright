const { test, expect } = require('@playwright/test');
const { startCheckout, fillCheckout, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test.describe('Order completion', () => {
  test('Finishing an order confirms purchase clears cart and allows return home', async ({ page }) => {
    await startCheckout(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });
});
