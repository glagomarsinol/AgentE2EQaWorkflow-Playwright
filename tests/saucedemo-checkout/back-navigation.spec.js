const { test, expect } = require('@playwright/test');
const { startCheckout, fillCheckout, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test('Browser Back from overview returns to checkout information', async ({ page }) => {
  await startCheckout(page);
  await fillCheckout(page);
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two\.html$/);

  await page.goBack();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
  await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
});
