# API Test Plan

## System under test

DummyJSON, a public fake REST API used only for learning and test automation practice.

## Scope

- Authentication and protected profile access
- Product list, product detail, and not-found responses
- Todo creation and update responses
- HTTP status, response contract, and important field validation

## Out of scope

- Performance and load testing
- Security penetration testing
- Persistence checks after POST/PATCH requests, because DummyJSON simulates writes

## Test approach

- Playwright `APIRequestContext` sends HTTP requests without a browser UI.
- Each test is independent and can run in parallel.
- Positive and negative tests validate expected HTTP behavior.
- GitHub Actions runs the suite on pushes and pull requests to `main`.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Shared demo API changes data or contract | Assertions validate stable response behavior, not fixed catalog text. |
| Public API is temporarily unavailable | CI retries failed tests twice. |
| Fake write endpoints do not persist data | Tests validate the returned response only. |
