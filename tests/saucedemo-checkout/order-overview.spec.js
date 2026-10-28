const { test, expect } = require('@playwright/test');
const { BACKPACK, startCheckout, fillCheckout, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test.describe('Order overview', () => {
  test.beforeEach(async ({ page }) => {
    await startCheckout(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
  });

  test('Order overview shows payment shipping items and calculated totals', async ({ page }) => {
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.locator('.cart_item').filter({ hasText: BACKPACK })).toContainText('$29.99');
    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
  });
});
