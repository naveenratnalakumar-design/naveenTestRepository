# Playwright Tests (JavaScript)

This repository contains end-to-end (E2E) tests using playwright with JAvaScript.
---
# Setup
Install dependencies:
npm install
Install Playwright browsers:
npx playwright install
Run all tests:
npx playwright test
Run in headed mode:
npx playwright test --headed
Run a specific test:
npx playwright test tests/example.spec.js
Generate and view HTML report:
npx playwright test --reporter=html
npx playwright show-report
