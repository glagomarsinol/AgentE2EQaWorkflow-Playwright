const { test, expect } = require('@playwright/test');
const { installCleanupHook } = require('./checkout-helpers');

test.describe('Checkout access control', () => {
  installCleanupHook(test);

  test('Unauthenticated user cannot open checkout directly', async ({ page }) => {
    // 1. Navigate directly to checkout in a fresh unauthenticated context.
    await page.goto('/checkout-step-one.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
  });
});
