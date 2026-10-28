const { test, expect } = require('@playwright/test');
const { login, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test('Empty cart cannot proceed to checkout', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page).not.toHaveURL(/checkout-step-one\.html$/);
});
