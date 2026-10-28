const { test, expect } = require('@playwright/test');
const { BASE_URL, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test('Unauthenticated user cannot open checkout directly', async ({ page }) => {
  await page.goto(`${BASE_URL}/checkout-step-one.html`);
  await expect(page).toHaveURL(`${BASE_URL}/`);
  await expect(page.locator('[data-test="error"]')).toContainText('You can only access');
});
