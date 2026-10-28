const { test, expect } = require('@playwright/test');
const { completeCheckoutInformation, startCheckout } = require('./checkout-helpers');

test('finishing an order confirms purchase, clears cart, and returns home', async ({ page }) => {
  await startCheckout(page);
  await completeCheckoutInformation(page);
  await page.getByTestId('finish').click();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.getByTestId('back-to-products')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-link')).toHaveAttribute('aria-label', 'Cart, empty');

  await page.getByTestId('back-to-products').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});
