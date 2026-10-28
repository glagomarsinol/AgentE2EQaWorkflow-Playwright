const { expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';
const BACKPACK = 'Sauce Labs Backpack';

async function login(page) {
  await page.goto(BASE_URL);
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html$/);
}

async function addBackpackToCart(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html$/);
}

async function startCheckout(page) {
  await login(page);
  await addBackpackToCart(page);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
}

async function fillCheckout(page, { firstName = 'Ada', lastName = 'Lovelace', postalCode = '10001' } = {}) {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
}

function installFailureScreenshot(test) {
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus && !page.isClosed()) {
      await page.screenshot({ path: testInfo.outputPath('failure.png'), fullPage: true });
    }
  });
}

module.exports = { BASE_URL, BACKPACK, login, addBackpackToCart, startCheckout, fillCheckout, installFailureScreenshot };
