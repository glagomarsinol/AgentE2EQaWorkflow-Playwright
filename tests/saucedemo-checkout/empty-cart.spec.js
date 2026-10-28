const { test, expect } = require('@playwright/test');
const { login } = require('./checkout-helpers');

test('empty cart cannot proceed to checkout', async ({ page }) => {
  await login(page);
  await page.getByTestId('shopping-cart-link').click();

  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.getByTestId('checkout')).toHaveCount(0);
});
