# SCRUM-101 Checkout Test Execution Report

**Application:** [SauceDemo](https://www.saucedemo.com)
**Test account:** `standard_user`
**Execution date:** 2026-10-28
**Environment:** Windows, Playwright 1.64.1; Chromium, Firefox, and WebKit (Safari project); mobile viewport 375 × 812
**Scope:** 11 scenarios covering cart, checkout validation, navigation, order completion, access control, and mobile usability.

## 1. Executive Summary

- **Planned:** 11 scenarios.
- **Manual:** 11 scenarios executed; 7 passed and 4 failed against the story/business rules.
- **Automated:** 33 executions (11 scenarios × 3 browser projects); 21 passed and 12 failed.
- **Overall:** Checkout’s standard happy path, required-field validation, access control, order completion, and mobile layout work. Four acceptance/business-rule gaps were reproduced in all three browser projects: no cart-level total, invalid symbol-only information accepted, checkout available from an empty cart, and overview Cancel returning to Products instead of Cart.
- The initial automation run also exposed a test setup defect: `startCheckout()` did not log in. That harness issue was corrected without changing the product assertions. A focused browser-back test then passed.

## 2. Manual Test Results

| # | Scenario | Result | Observation |
|---|---|---|---|
| 1 | Cart review | **FAIL** | Backpack name, description, $29.99 price, quantity 1, and both actions are shown; the cart has no cart-level total. See [cart-review.png](./evidence/cart-review.png). |
| 2 | Required checkout fields | **PASS** | Empty First Name, Last Name, and Postal Code each produced the corresponding required-field message. See [checkout-required-field-error.png](./evidence/checkout-required-field-error.png). |
| 3 | Invalid symbol-only values | **FAIL** | `!@#`, `$%^`, and `???` advanced to the overview with no validation. See [invalid-data-advanced-to-overview.png](./evidence/invalid-data-advanced-to-overview.png). |
| 4 | Cancel from checkout information | **PASS** | Returned to Cart and retained the backpack. |
| 5 | Cancel from order overview | **FAIL** | Returned to Products instead of Cart. The cart item remains. See [overview-cancel-returns-to-products.png](./evidence/overview-cancel-returns-to-products.png). |
| 6 | Order overview | **PASS** | Correct item, payment, shipping, subtotal ($29.99), tax ($2.40), total ($32.39), Cancel, and Finish shown. See [order-overview.png](./evidence/order-overview.png). |
| 7 | Order completion | **PASS** | Success confirmation appeared; Back Home returned to Products with an empty cart. See [order-confirmation.png](./evidence/order-confirmation.png). |
| 8 | Empty cart restriction | **FAIL** | Checkout remained available and opened the information page with an empty cart. See [empty-cart-checkout-page.png](./evidence/empty-cart-checkout-page.png). |
| 9 | Unauthenticated checkout access | **PASS** | Direct navigation to checkout redirected to login and explained login was required. |
| 10 | Mobile checkout | **PASS** | Information and overview remained usable at 375 × 812 without horizontal overflow. See [mobile-checkout-information.png](./evidence/mobile-checkout-information.png) and [mobile-checkout-overview.png](./evidence/mobile-checkout-overview.png). |
| 11 | Browser Back from overview | **PASS** | In the active test browser, Back returned to checkout information and retained the cart item. |

Other evidence: [products-after-login.png](./evidence/products-after-login.png) and [checkout-information.png](./evidence/checkout-information.png).

## 3. Automated Test Results

### Initial run and healing

- **Initial Chromium run:** 2 passed, 9 failed. Seven failures timed out because the shared `startCheckout()` helper skipped login; the cart-total and empty-cart assertions exposed product behavior.
- **Healing:** Added login to `startCheckout()`, retained the story-based assertions, and set the suite to one worker because all tests share the same remote demo account/site. The focused browser-back test passed after the repair.
- Test output was moved to `test-results/playwright-artifacts` so Playwright cleanup does not remove this report or evidence.
- The requested standalone healer agent could not start because its configured model was unavailable. Playwright’s test-debug output was used to identify and repair the missing-login helper issue; no acceptance assertion was weakened.

### Final browser matrix

| Browser project | Passed | Failed | Result |
|---|---:|---:|---|
| Chromium | 7 | 4 | Four product deviations |
| Firefox | 7 | 4 | Same four product deviations |
| WebKit (Safari) | 7 | 4 | Same four product deviations |
| **Total** | **21** | **12** | **33 executions** |

### Suite summary across all browser projects

| Test suite | Passed | Failed |
|---|---:|---:|
| Browser Back navigation | 3 | 0 |
| Checkout cancellation navigation | 3 | 3 |
| Cart review | 0 | 3 |
| Checkout access | 3 | 0 |
| Checkout validation | 3 | 3 |
| Empty cart | 0 | 3 |
| Mobile checkout | 3 | 0 |
| Order completion | 3 | 0 |
| Order overview | 3 | 0 |
| **Total** | **21** | **12** |

The four failing assertions are acceptance checks, not unresolved selector or timing issues. Each failed once in Chromium, Firefox, and WebKit.

## 4. Defects Log

### QA-101-01 — Cart has no calculated total

- **Severity:** Medium
- **Description:** Cart review shows the backpack’s unit price but no cart-level total, contrary to AC1.
- **Steps to reproduce:** Log in, add Sauce Labs Backpack, open Cart.
- **Expected:** Product details and a calculated total for the cart items are visible.
- **Actual:** Product details, quantity, unit price, Continue Shopping, and Checkout are visible; no total is shown.
- **Evidence:** [cart-review.png](./evidence/cart-review.png)
- **Environment:** SauceDemo, all three automated browser projects.

### QA-101-02 — Special-character-only checkout values are accepted

- **Severity:** Medium
- **Description:** Checkout accepts symbol-only names and postal code without validation.
- **Steps to reproduce:** Open checkout with an item; enter `!@#`, `$%^`, and `???`; select Continue.
- **Expected:** Invalid data is rejected and the user remains on checkout information with an error.
- **Actual:** The application advances to the order overview.
- **Evidence:** [invalid-data-advanced-to-overview.png](./evidence/invalid-data-advanced-to-overview.png)
- **Environment:** SauceDemo, all three automated browser projects.

### QA-101-03 — Empty cart can enter checkout

- **Severity:** Medium
- **Description:** Checkout can be initiated without any items in the cart.
- **Steps to reproduce:** Log in, open Cart with no items, select Checkout.
- **Expected:** The action is unavailable or progression is blocked.
- **Actual:** Checkout information opens with an empty cart.
- **Evidence:** [empty-cart-checkout-page.png](./evidence/empty-cart-checkout-page.png)
- **Environment:** SauceDemo, all three automated browser projects.

### QA-101-04 — Overview Cancel returns to Products

- **Severity:** Low
- **Description:** Cancel from the order overview returns to Products rather than Cart, contrary to the cancellation rule.
- **Steps to reproduce:** Add an item, proceed through valid checkout information to the overview, select Cancel.
- **Expected:** Return to Cart with the item retained.
- **Actual:** Products is displayed; the cart item remains available.
- **Evidence:** [overview-cancel-returns-to-products.png](./evidence/overview-cancel-returns-to-products.png)
- **Environment:** SauceDemo, all three automated browser projects.

## 5. Test Coverage Analysis

| Requirement | Manual coverage | Automated coverage | Result |
|---|---|---|---|
| AC1 — Cart review and total | Product details/actions verified; cart-level total absent | Cart review assertions in Chromium, Firefox, and WebKit | **Partial; total is a defect** |
| AC2 — Required checkout information | Each required-field error checked | Required-field scenario in all three projects | **Pass** |
| AC3 — Order overview | Item, payment, shipping, totals, and actions checked | Overview summary in all three projects | **Pass; overview Cancel is a separate defect** |
| AC4 — Order completion | Confirmation, Back Home, and cart clearing checked | Completion scenario in all three projects | **Pass** |
| AC5 — Invalid data | Symbol-only values submitted | Invalid-data scenario in all three projects | **Fail** |
| Business rule — login required | Direct unauthenticated access checked | Checkout access scenario in all three projects | **Pass** |
| Business rule — non-empty cart | Empty-cart checkout attempted | Empty-cart scenario in all three projects | **Fail** |
| Business rule — cancel to cart | Cancel checked from both checkout stages | Both cancellation steps in all three projects | **Partial; overview Cancel fails** |
| Technical note — mobile usability | 375 × 812 information and overview screens checked | Responsive scenario in all three projects | **Pass** |
| Technical note — browser Back | Back from overview checked | Back scenario in all three projects | **Pass** |

## 6. Summary and Recommendations

The normal one-item checkout path works across Chromium, Firefox, and WebKit, including required-field feedback, overview calculations, order confirmation, cart clearing, and mobile layout. Four SCRUM-101 requirements remain unmet and should be addressed before accepting the checkout workflow:

1. Show an aggregate cart total during cart review.
2. Validate checkout names and postal code beyond non-empty checks.
3. Prevent checkout progression when the cart is empty.
4. Route overview Cancel back to Cart.

After those changes, rerun the 11-scenario suite in all three browser projects. Keep the product assertions strict so these regressions remain visible.
