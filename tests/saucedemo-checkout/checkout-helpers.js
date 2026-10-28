const { expect } = require('@playwright/test');

async function login(page) {
  await page.goto('/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

async function addBackpack(page) {
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/cart\.html/);
}

async function startCheckout(page) {
  await login(page);
  await addBackpack(page);
  await page.getByTestId('checkout').click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

async function completeCheckoutInformation(page) {
  await page.getByTestId('firstName').fill('Ada');
  await page.getByTestId('lastName').fill('Lovelace');
  await page.getByTestId('postalCode').fill('10001');
  await page.getByTestId('continue').click();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
}

module.exports = {
  addBackpack,
  completeCheckoutInformation,
  login,
  startCheckout,
};
