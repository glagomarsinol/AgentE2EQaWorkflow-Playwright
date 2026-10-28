# End-to-End QA Workflow with Natural Language

## Workflow Overview

This prompt guides a complete seven-step QA workflow using MCP servers
and AI agents, from the user story to committed automated test scripts.

------------------------------------------------------------------------

## STEP 1: Read User Story

### Prompt

Read `user-stories/SCRUM-101-ecommerce-checkout.md` and summarize the
key requirements, acceptance criteria, and testing scope.

### Expected Output

-   Summary of the user story
-   Acceptance criteria
-   Application URL and test credentials, if documented
-   Key features to test

------------------------------------------------------------------------

## STEP 2: Create Test Plan

### Prompt

Based on SCRUM-101, use the `playwright-test-planner` agent, if
available, to:

1.  Read the application URL and test credentials from the user story.
2.  Explore the application and understand the workflows in the
    acceptance criteria.
3.  Create a comprehensive plan covering:
    -   Happy-path scenarios
    -   Negative scenarios (validation errors, empty fields, invalid
        data)
    -   Edge cases and boundary conditions
    -   Navigation-flow tests
    -   UI-element validation
4.  Save the plan as `specs/saucedemo-checkout-test-plan.md`.

Each scenario must include a clear title, step-by-step instructions,
expected results for each step, and test data requirements.

### Expected Output

-   Complete Markdown test plan saved to `specs/`
-   Clearly organized test scenarios
-   Browser exploration screenshots, if useful and supported

------------------------------------------------------------------------

## STEP 3: Perform Exploratory Testing

### Prompt

Read `specs/saucedemo-checkout-test-plan.md` and execute each scenario
manually using available Playwright MCP browser tools.

1.  Follow the steps in each test case.
2.  Compare actual results with expected results.
3.  Capture screenshots at key steps and error states when supported.
4.  Document execution results, UI inconsistencies, missing validations,
    bugs, and evidence references.

### Expected Output

-   Manual execution results
-   Screenshots/evidence references where available
-   Observations and issues discovered during exploration

------------------------------------------------------------------------

## STEP 4: Generate Automation Scripts

### Prompt

Use the `playwright-test-generator` agent, if available, to generate
JavaScript Playwright tests based on:

1.  `specs/saucedemo-checkout-test-plan.md`
2.  Step 3 exploratory results, including confirmed selectors and
    observed UI behavior

Create scripts for the planned scenarios under
`tests/saucedemo-checkout/`.

### Requirements

-   Follow Playwright best practices and use appropriate `expect()`
    assertions.
-   Use descriptive test names aligned with the test plan.
-   Prefer stable selectors, including accessible roles/names, IDs, and
    data attributes confirmed during exploration.
-   Use suitable synchronization strategies; avoid arbitrary sleeps
    where possible.
-   Add comments for complex steps and use `beforeEach`/`afterEach`
    where appropriate.
-   Configure Chromium, Firefox, and WebKit where supported. WebKit
    tests the WebKit engine; it is not native Safari.

Run the generated tests and record actual results.

### Expected Output

-   Test files under `tests/saucedemo-checkout/`
-   Robust selectors and appropriate assertions
-   Initial execution results

------------------------------------------------------------------------

## STEP 5: Execute and Heal Automation Tests

### Prompt

Run all automation scripts in `tests/saucedemo-checkout/` and classify
every failure as one of:

-   **Automation defect:** incorrect locator, missing setup,
    synchronization issue, or test configuration problem.
-   **Application defect:** behavior violates a documented acceptance
    criterion or requirement.
-   **Environment/infrastructure issue:** browser, network,
    authentication, or test infrastructure prevents reliable evaluation.

Use the `playwright-test-healer` agent, if available, or suitable
Playwright debugging tools to repair automation defects.

1.  Record initial results.
2.  Repair automation defects and rerun affected tests.
3.  Run the full suite across Chromium, Firefox, and WebKit where
    supported.
4.  Preserve valid acceptance assertions. Never remove, weaken, skip, or
    bypass an assertion just to make a test pass.
5.  Do not classify an application defect as a healed test. Keep it
    reported as a failure until the application is fixed and retested.
6.  Record repairs, changed files, final results, unresolved defects,
    and environment limitations.

Repeat repairs only while identifiable automation defects remain; do not
change tests merely to force a fully passing suite.

### Expected Output

-   Tests executed and failures classified
-   Automation defects repaired where possible
-   Updated scripts under `tests/saucedemo-checkout/`
-   Initial and final pass/fail/blocked summaries
-   Application defects and infrastructure issues clearly reported

------------------------------------------------------------------------

## STEP 6: Create Test Report

### Prompt

Compile actual results from Step 3 (manual testing), Step 4 (generated
scripts), and Step 5 (automation execution and repairs). Save the report
as `test-results/SCRUM-101-checkout-test-report.md`.

Include these sections:

### 1. Executive Summary

-   Total planned test cases
-   Manual and automated execution counts, reported separately
-   Overall PASS/FAIL/BLOCKED status
-   Important limitations or unexecuted coverage

### 2. Manual Test Results

-   Step 3 results
-   Evidence references, where available
-   Issues found

### 3. Automated Test Results

-   Initial execution results
-   Healing activities and reasons for changes
-   Final execution results
-   Suite summary and per-browser results where available

### 4. Defects Log

For each confirmed defect, include: - Bug ID and severity
(Critical/High/Medium/Low) - Title and description - Steps to
reproduce - Expected versus actual behavior - Evidence reference, if
available - Environment details - Related acceptance criterion

Distinguish application defects from automation and environment issues.

### 5. Test Coverage Analysis

-   Acceptance criteria covered
-   Manual versus automated coverage
-   Coverage gaps
-   Recommendations for additional testing

### 6. Summary and Recommendations

-   Quality assessment based on collected evidence
-   Risk areas
-   Next steps

### Expected Output

-   Report with clear PASS/FAIL/BLOCKED status for each scenario
-   Detailed records for confirmed defects
-   Coverage analysis
-   Evidence references; never invent screenshots or results that were
    not captured

------------------------------------------------------------------------

## STEP 7: Commit to Git Repository

### Repository

[AgentE2EQaWorkflow-Playwright](https://github.com/glagomarsinol/AgentE2EQaWorkflow-Playwright.git)

### Prompt

Use the available GitHub MCP agent or local Git tooling to commit the
intended test artifacts.

1.  Check whether the workspace is already a Git repository; initialize
    only if necessary.
2.  Inspect `git status` and review the changes.
3.  Stage intended project files only. Do not stage secrets,
    credentials, local environment files, generated noise, or unrelated
    changes.
4.  Create a commit with this message:

``` text
feat(tests): Add complete test suite for SCRUM-101 checkout workflow

- Add user story documentation
- Add comprehensive test plan with all scenarios
- Add test execution report with results
- Add automated test scripts for checkout process
- Include validation, navigation, and edge case tests

Resolves SCRUM-101
```

5.  Verify the repository, branch, and remote before pushing.
6.  Verify the push result. If authentication or network access fails,
    report the actual status and required next action. Never claim
    success without verification.
7.  Summarize the commit hash, files changed, and push status.

### Expected Output

-   Intended files committed
-   Conventional commit message
-   Verified push status or a clear explanation if it failed
-   Summary of committed changes

------------------------------------------------------------------------

## Complete Workflow Execution: Single Combined Prompt

I want to demonstrate a complete end-to-end QA workflow using natural
language and MCP servers. Execute the seven steps in order and provide a
concise status update after each step.

Use available tools and agents. If a named agent or MCP tool is
unavailable, state the limitation and use an appropriate alternative
where possible. Do not claim an action was completed unless it was
actually performed and verified.

1.  **Read user story:** Read
    `user-stories/SCRUM-101-ecommerce-checkout.md` and summarize
    requirements and acceptance criteria.
2.  **Create test plan:** Use `playwright-test-planner`, if available,
    to explore the application and save a comprehensive plan to
    `specs/saucedemo-checkout-test-plan.md`.
3.  **Exploratory testing:** Execute the plan with available Playwright
    browser tools and record actual results, evidence, and defects.
4.  **Generate scripts:** Use `playwright-test-generator`, if available,
    to create JavaScript Playwright tests in
    `tests/saucedemo-checkout/`.
5.  **Execute and heal:** Run tests, repair automation defects with
    `playwright-test-healer` or debugging tools, preserve acceptance
    assertions, and report genuine application failures.
6.  **Create report:** Save actual results, repairs, defects, evidence,
    and coverage analysis to
    `test-results/SCRUM-101-checkout-test-report.md`.
7.  **Commit to Git:** Stage and commit intended artifacts, push to the
    repository, and verify the commit hash and push status.

### Final Summary

Report: - Status of each workflow step - Artifacts created or updated -
Manual and automated results - Confirmed application defects and
unresolved issues - Commit hash and verified push status, if completed
