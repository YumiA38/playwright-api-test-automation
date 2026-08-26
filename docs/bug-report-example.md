# Example API Bug Report

> This is a sample report demonstrating QA documentation. It is not a confirmed defect in DummyJSON.

## Title

`GET /products/{id}` returns an unclear error payload for an unknown product

## Severity / Priority

Medium / Medium

## Preconditions

- API base URL is available.

## Steps to reproduce

1. Send `GET /products/999999`.
2. Inspect the JSON error response.

## Actual result

The API returns an error message, but the response does not include a stable machine-readable error code for client applications.

## Expected result

The `404` response should include an error code such as `PRODUCT_NOT_FOUND` alongside a human-readable message.

## Evidence

- Request: `GET https://dummyjson.com/products/999999`
- Expected status: `404`
