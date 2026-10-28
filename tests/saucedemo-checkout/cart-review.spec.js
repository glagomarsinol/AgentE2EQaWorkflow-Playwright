const { test, expect } = require('@playwright/test');
const { addBackpack, login } = require('./checkout-helpers');

test('cart review displays product details and checkout actions', async ({ page }) => {
  await login(page);
  await addBackpack(page);

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('carry.allTheThings() with the sleek')).toBeVisible();
  await expect(page.getByText('$29.99')).toBeVisible();
  await expect(page.getByTestId('item-quantity')).toHaveText('1');
  await expect(page.getByTestId('continue-shopping')).toBeVisible();
  await expect(page.getByTestId('checkout')).toBeVisible();
  await expect(page.getByText('Total: $29.99')).toBeVisible();
});
