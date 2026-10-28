const { test, expect } = require('@playwright/test');
const { completeCheckoutInformation, startCheckout } = require('./checkout-helpers');

test('order overview shows payment, shipping, items, and totals', async ({ page }) => {
  await startCheckout(page);
  await completeCheckoutInformation(page);

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('SauceCard #31337')).toBeVisible();
  await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
  await expect(page.getByText('Item total: $29.99')).toBeVisible();
  await expect(page.getByText('Tax: $2.40')).toBeVisible();
  await expect(page.getByText('Total: $32.39')).toBeVisible();
  await expect(page.getByTestId('cancel')).toBeVisible();
  await expect(page.getByTestId('finish')).toBeVisible();
});

test('browser Back from overview returns to checkout information', async ({ page }) => {
  await startCheckout(page);
  await completeCheckoutInformation(page);
  await page.goBack();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(page.getByTestId('firstName')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
});
