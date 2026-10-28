const { test, expect } = require('@playwright/test');
const { completeCheckoutInformation, startCheckout } = require('./checkout-helpers');

test('cancel from checkout information returns to the cart', async ({ page }) => {
  await startCheckout(page);
  await page.getByTestId('cancel').click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('cancel from order overview returns to the cart', async ({ page }) => {
  await startCheckout(page);
  await completeCheckoutInformation(page);
  await page.getByTestId('cancel').click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});
