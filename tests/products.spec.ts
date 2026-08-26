import { expect, test } from "@playwright/test";
import type { Product, ProductListResponse } from "../src/types/api.types";

test.describe("Products API", () => {
  test("returns a paginated product list with the requested fields", async ({ request }) => {
    const response = await request.get("/products?limit=5&skip=0&select=title,price,category");

    expect(response.status()).toBe(200);
    const body = (await response.json()) as ProductListResponse;
    expect(body.limit).toBe(5);
    expect(body.skip).toBe(0);
    expect(body.total).toBeGreaterThan(5);
    expect(body.products).toHaveLength(5);

    for (const product of body.products) {
      expect(product.title).toEqual(expect.any(String));
      expect(product.price).toEqual(expect.any(Number));
      expect(product.category).toEqual(expect.any(String));
    }
  });

  test("returns a single product by ID", async ({ request }) => {
    const response = await request.get("/products/1");

    expect(response.status()).toBe(200);
    const product = (await response.json()) as Product;
    expect(product.id).toBe(1);
    expect(product.title.length).toBeGreaterThan(0);
    expect(product.price).toBeGreaterThan(0);
  });

  test("returns 404 for a product that does not exist", async ({ request }) => {
    const response = await request.get("/products/999999");

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toEqual(expect.any(String));
  });
});
