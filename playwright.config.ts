import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  timeout: 30_000,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: process.env.API_BASE_URL ?? "https://dummyjson.com",
    extraHTTPHeaders: {
      Accept: "application/json"
    },
    trace: "on-first-retry"
  }
});
