# SCRUM-101 SauceDemo checkout test plan

## Application Overview

Validate SauceDemo cart review and checkout against SCRUM-101 acceptance criteria and business rules. Test application https://www.saucedemo.com with standard_user / secret_sauce. Live exploration confirmed the standard one-item checkout totals ($29.99 subtotal, $2.40 tax, $32.39 total), successful confirmation clears the cart, and the Back Home control is present. Exploration also found likely deviations: checkout proceeds with special-character-only name/postal values, checkout is accessible from an empty cart, and Cancel from the order overview navigates to Products instead of returning to Cart. Cancel from checkout information does return to Cart. Tests should assert the story requirements and report observed deviations as product defects.

## Test Scenarios

### 1. Checkout and cart behavior

**Seed:** `tests/seed.spec.ts`

#### 1.1. Cart review displays product details and checkout actions

**File:** `tests/saucedemo-checkout/cart-review.spec.js`

**Steps:**
  1. Start a fresh browser session, log in as standard_user, and add Sauce Labs Backpack to the cart.
    - expect: The products page is shown after login.
    - expect: The cart badge shows one item.
  2. Open the cart and inspect the backpack row and available actions.
    - expect: The cart shows the product name, description, unit price, and quantity 1.
    - expect: Continue Shopping and Checkout actions are available.

#### 1.2. Checkout information requires each mandatory field

**File:** `tests/saucedemo-checkout/checkout-validation.spec.js`

**Steps:**
  1. Log in, add a product, open the cart, choose Checkout, and submit with all three fields blank.
    - expect: The checkout information page remains open.
    - expect: An error identifies First Name as required.
  2. Enter a first name only and submit again.
    - expect: The page remains on checkout information.
    - expect: An error identifies Last Name as required.
  3. Enter a last name and leave postal code blank, then submit.
    - expect: The page remains on checkout information.
    - expect: An error identifies Zip/Postal Code as required.

#### 1.3. Checkout rejects invalid name and postal data

**File:** `tests/saucedemo-checkout/checkout-validation.spec.js`

**Steps:**
  1. Log in, add a product, open checkout information, and fill First Name with !@#, Last Name with $%^, and Zip/Postal Code with ???.
    - expect: All values are entered into their respective fields.
  2. Submit the form.
    - expect: Invalid data is rejected with a validation message.
    - expect: The user remains on checkout information and cannot proceed.

#### 1.4. Cancel from checkout information returns to the cart

**File:** `tests/saucedemo-checkout/cancel-navigation.spec.js`

**Steps:**
  1. Log in, add a product, open the cart, and choose Checkout.
    - expect: Checkout information page is displayed with cart contents preserved.
  2. Choose Cancel.
    - expect: The cart page is shown and the previously added product remains in the cart.

#### 1.5. Cancel from order overview returns to the cart

**File:** `tests/saucedemo-checkout/cancel-navigation.spec.js`

**Steps:**
  1. Complete checkout information with Ada, Lovelace, and 10001, then continue to overview.
    - expect: Checkout overview is displayed.
  2. Choose Cancel.
    - expect: The cart page is shown and the previously added product remains in the cart.

#### 1.6. Order overview shows payment shipping items and calculated totals

**File:** `tests/saucedemo-checkout/order-overview.spec.js`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open checkout, and enter Ada Lovelace and postal code 10001.
    - expect: Checkout information is accepted and the overview is displayed.
  2. Inspect the overview.
    - expect: The Backpack is listed with quantity 1.
    - expect: Payment Information shows SauceCard #31337.
    - expect: Shipping Information shows Free Pony Express Delivery!.
    - expect: Item total is $29.99, tax is $2.40, and total is $32.39.
    - expect: Cancel and Finish actions are available.

#### 1.7. Finishing an order confirms purchase clears cart and allows return home

**File:** `tests/saucedemo-checkout/order-completion.spec.js`

**Steps:**
  1. Complete a valid one-item checkout and choose Finish on the overview.
    - expect: Checkout Complete page is displayed with a success message.
    - expect: Back Home action is available.
    - expect: Cart badge indicates empty.
  2. Choose Back Home.
    - expect: The products page is displayed.
    - expect: The cart remains empty.

#### 1.8. Empty cart cannot proceed to checkout

**File:** `tests/saucedemo-checkout/empty-cart.spec.js`

**Steps:**
  1. Log in without adding any products and open the cart.
    - expect: The cart is empty.
    - expect: Checkout should be disabled, absent, or prevented from advancing.
  2. Attempt to choose Checkout if it is available.
    - expect: The user cannot reach checkout information with an empty cart.

#### 1.9. Unauthenticated user cannot open checkout directly

**File:** `tests/saucedemo-checkout/checkout-access.spec.js`

**Steps:**
  1. In a fresh unauthenticated browser context, navigate directly to https://www.saucedemo.com/checkout-step-one.html.
    - expect: The user is redirected to login or otherwise prevented from viewing checkout information.

#### 1.10. Checkout remains usable at a mobile viewport

**File:** `tests/saucedemo-checkout/mobile-checkout.spec.js`

**Steps:**
  1. Set a mobile-sized viewport, log in, add a product, and navigate to checkout information.
    - expect: Checkout title, all required fields, and Cancel and Continue actions remain visible and usable without horizontal overflow.
  2. Continue to overview and inspect the item summary and order actions.
    - expect: The overview content and Cancel/Finish controls remain usable at the mobile viewport.

#### 1.11. Browser Back from overview returns to checkout information

**File:** `tests/saucedemo-checkout/back-navigation.spec.js`

**Steps:**
  1. Complete valid checkout information and continue to the order overview.
    - expect: The order overview is displayed.
  2. Use the browser Back action.
    - expect: The checkout information page is displayed and the cart item remains in the cart.
