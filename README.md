# Playwright API Test Automation

[![API Tests](https://github.com/YumiA38/playwright-api-test-automation/actions/workflows/api-tests.yml/badge.svg)](https://github.com/YumiA38/playwright-api-test-automation/actions/workflows/api-tests.yml)

A recruiter-friendly junior QA portfolio project that tests a REST API with **Playwright** and **TypeScript**. It complements UI automation by validating API status codes, authentication, response contracts, negative scenarios, and simulated CRUD responses.

## What this project demonstrates

- API testing with Playwright `APIRequestContext`
- Authentication with a bearer token
- Positive and negative test design
- Response contract and data-type validation
- TypeScript interfaces for readable test code
- Automated tests and HTML report artifacts in GitHub Actions
- Professional QA documentation: test plan, test cases, and a bug-report example

## API under test

[DummyJSON](https://dummyjson.com/) is a free fake REST API intended for development and testing. Its write endpoints simulate responses, so this suite validates returned data rather than database persistence.

## Test coverage

| Area | Scenarios |
| --- | --- |
| Authentication | Valid login, protected profile, invalid credentials |
| Products | Pagination, response fields, product detail, 404 error |
| Todos | Create and update response validation |

## Run locally

```bash
npm install
npm run test:api
```

To open the HTML report after a test run:

```bash
npm run report
```

## Offline verification

The default test target is DummyJSON. For a local contract-stub run without external network access, start the included mock API in one terminal and run the tests in another:

```bash
npm run mock-api
API_BASE_URL=http://127.0.0.1:4173 npm run test:api
```

## Project structure

```text
playwright-api-test-automation/
├── .github/workflows/api-tests.yml
├── docs/
│   ├── bug-report-example.md
│   ├── test-cases.md
│   └── test-plan.md
├── src/types/api.types.ts
├── tests/
│   ├── auth.spec.ts
│   ├── products.spec.ts
│   └── todos.spec.ts
├── playwright.config.ts
└── package.json
```

## Notes for reviewers

The suite calls a public demo API over HTTPS. No personal credentials, secrets, or production systems are used.
