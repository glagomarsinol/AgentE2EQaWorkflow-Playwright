const { test, expect } = require('@playwright/test');
const { BACKPACK, startCheckout, fillCheckout, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test.describe('Checkout cancellation navigation', () => {
  test('Cancel from checkout information returns to the cart', async ({ page }) => {
    await startCheckout(page);
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item').filter({ hasText: BACKPACK })).toBeVisible();
  });

  test('Cancel from order overview returns to the cart', async ({ page }) => {
    await startCheckout(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item').filter({ hasText: BACKPACK })).toBeVisible();
  });
});
