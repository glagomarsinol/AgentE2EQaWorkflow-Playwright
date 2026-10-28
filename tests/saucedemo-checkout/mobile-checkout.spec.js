const { test, expect } = require('@playwright/test');
const { login, installFailureScreenshot } = require('./checkout-helpers');

installFailureScreenshot(test);

test('Checkout remains usable at a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  await expect(page.locator('[data-test="lastName"]')).toBeVisible();
  await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.locator('[data-test="firstName"]').fill('Ada');
  await page.locator('[data-test="lastName"]').fill('Lovelace');
  await page.locator('[data-test="postalCode"]').fill('10001');
  await expect(page.locator('[data-test="firstName"]')).toHaveValue('Ada');
  await expect(page.locator('[data-test="lastName"]')).toHaveValue('Lovelace');
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue('10001');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('.title')).toHaveText('Checkout: Overview');
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
