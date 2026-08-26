import { expect, test } from "@playwright/test";
import type { LoginResponse } from "../src/types/api.types";

test.describe("Authentication API", () => {
  test("authenticates a valid user and retrieves the protected profile", async ({ request }) => {
    const loginResponse = await request.post("/auth/login", {
      data: {
        username: "emilys",
        password: "emilyspass"
      }
    });

    expect(loginResponse.status()).toBe(200);
    const login = (await loginResponse.json()) as LoginResponse;
    expect(login.accessToken).toEqual(expect.any(String));
    expect(login.refreshToken).toEqual(expect.any(String));
    expect(login.username).toBe("emilys");

    const profileResponse = await request.get("/auth/me", {
      headers: { Authorization: `Bearer ${login.accessToken}` }
    });

    expect(profileResponse.status()).toBe(200);
    const profile = (await profileResponse.json()) as LoginResponse;
    expect(profile.username).toBe("emilys");
    expect(profile.email).toContain("@");
  });

  test("rejects invalid credentials", async ({ request }) => {
    const response = await request.post("/auth/login", {
      data: {
        username: "emilys",
        password: "wrong-password"
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toEqual(expect.any(String));
  });
});
