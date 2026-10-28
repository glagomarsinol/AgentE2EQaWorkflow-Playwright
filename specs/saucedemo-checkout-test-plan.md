# SCRUM-101 SauceDemo checkout test plan

## Application Overview

Validate SauceDemo cart review and checkout against SCRUM-101 acceptance criteria and business rules at https://www.saucedemo.com using standard_user / secret_sauce. Exploration confirmed a one-item overview total of $29.99 subtotal, $2.40 tax, and $32.39 total; the cart itself does not show a cart-level total. It also exposed likely deviations: special-character checkout values are accepted, empty-cart checkout is available, and Cancel from the overview navigates to Products instead of returning to the cart. Plan assertions reflect story requirements; observed deviations will be tracked separately.

## Test Scenarios

### 1. Checkout and cart behavior

**Seed:** `tests/seed.spec.ts`

#### 1.1. Cart review displays product details and checkout actions

**File:** `tests/saucedemo-checkout/cart-review.spec.js`

**Steps:**
  1. Log in as standard_user, add Sauce Labs Backpack, then open the cart.
    - expect: Products page is displayed after login.
    - expect: Cart badge shows one item.
  2. Inspect the item row and cart actions.
    - expect: Backpack name, description, $29.99 unit price, and quantity 1 are shown.
    - expect: The cart displays a calculated total for the listed items.
    - expect: Continue Shopping and Checkout are available.

#### 1.2. Checkout requires each mandatory field

**File:** `tests/saucedemo-checkout/checkout-validation.spec.js`

**Steps:**
  1. Open checkout from a non-empty cart and submit all fields blank.
    - expect: Checkout information page remains open.
    - expect: Error identifies First Name as required.
  2. Enter only a first name and submit.
    - expect: Error identifies Last Name as required.
  3. Enter a last name and leave postal code blank, then submit.
    - expect: Error identifies Zip/Postal Code as required.

#### 1.3. Checkout rejects invalid name and postal data

**File:** `tests/saucedemo-checkout/checkout-validation.spec.js`

**Steps:**
  1. Enter !@#, $%^, and ??? into First Name, Last Name, and Zip/Postal Code.
    - expect: Each value appears in the corresponding field.
  2. Submit checkout information.
    - expect: Invalid data is rejected with a validation message.
    - expect: User remains on checkout information and cannot proceed.

#### 1.4. Cancel from checkout information returns to the cart

**File:** `tests/saucedemo-checkout/cancel-navigation.spec.js`

**Steps:**
  1. Open checkout information from a cart containing the backpack, then select Cancel.
    - expect: Cart page is displayed.
    - expect: Backpack remains in the cart.

#### 1.5. Cancel from order overview returns to the cart

**File:** `tests/saucedemo-checkout/cancel-navigation.spec.js`

**Steps:**
  1. Enter Ada Lovelace and postal code 10001, continue to overview, then select Cancel.
    - expect: Cart page is displayed.
    - expect: Backpack remains in the cart.

#### 1.6. Order overview shows payment shipping items and calculated totals

**File:** `tests/saucedemo-checkout/order-overview.spec.js`

**Steps:**
  1. Complete checkout information for a one-item backpack cart using Ada Lovelace and 10001.
    - expect: Backpack is listed with quantity 1.
    - expect: Payment Information shows SauceCard #31337 and Shipping Information shows Free Pony Express Delivery!.
    - expect: Item total is $29.99, tax is $2.40, and total is $32.39.
    - expect: Cancel and Finish actions are available.

#### 1.7. Finishing an order confirms purchase clears cart and allows return home

**File:** `tests/saucedemo-checkout/order-completion.spec.js`

**Steps:**
  1. Finish a valid one-item checkout, then select Back Home.
    - expect: Checkout Complete page confirms success and provides Back Home.
    - expect: Products page is displayed after Back Home and cart badge remains empty.

#### 1.8. Empty cart cannot proceed to checkout

**File:** `tests/saucedemo-checkout/empty-cart.spec.js`

**Steps:**
  1. Log in without adding products and open the cart.
    - expect: Cart is empty.
    - expect: Checkout is absent, disabled, or blocked.
  2. Attempt checkout if the control is available.
    - expect: Checkout information cannot be reached with an empty cart.

#### 1.9. Unauthenticated user cannot open checkout directly

**File:** `tests/saucedemo-checkout/checkout-access.spec.js`

**Steps:**
  1. In a fresh unauthenticated browser context, navigate to /checkout-step-one.html.
    - expect: User is redirected to login or otherwise prevented from viewing checkout information.

#### 1.10. Checkout remains usable at a mobile viewport

**File:** `tests/saucedemo-checkout/mobile-checkout.spec.js`

**Steps:**
  1. Set a mobile-sized viewport, log in, add a product, and navigate to checkout information.
    - expect: Checkout title, required fields, Cancel and Continue remain visible and usable without horizontal overflow.
  2. Continue to overview and inspect the item summary and order actions.
    - expect: Overview content and Cancel/Finish controls remain usable at the mobile viewport.

#### 1.11. Browser Back from overview returns to checkout information

**File:** `tests/saucedemo-checkout/back-navigation.spec.js`

**Steps:**
  1. Complete valid checkout information, continue to overview, then use browser Back.
    - expect: Checkout information page is displayed and cart item remains in cart.
