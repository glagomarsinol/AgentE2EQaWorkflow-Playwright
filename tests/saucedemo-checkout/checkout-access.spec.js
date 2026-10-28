const { test, expect } = require('@playwright/test');

test('unauthenticated users cannot open checkout directly', async ({ page }) => {
  await page.goto('/checkout-step-one.html');

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
});
