const { test, expect } = require('@playwright/test');
const { completeCheckoutInformation, startCheckout } = require('./checkout-helpers');

test.use({ viewport: { width: 375, height: 812 } });

test('checkout remains usable at a mobile viewport', async ({ page }) => {
  await startCheckout(page);
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  await expect(page.getByTestId('firstName')).toBeVisible();
  await expect(page.getByTestId('lastName')).toBeVisible();
  await expect(page.getByTestId('postalCode')).toBeVisible();
  await expect(page.getByTestId('cancel')).toBeVisible();
  await expect(page.getByTestId('continue')).toBeVisible();
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 375);

  await completeCheckoutInformation(page);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByTestId('cancel')).toBeVisible();
  await expect(page.getByTestId('finish')).toBeVisible();
});
