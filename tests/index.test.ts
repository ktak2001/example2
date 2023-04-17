import { test, expect } from "@playwright/test";

test("Top", async ({ page }) => {
  await page.goto("/");
  await new Promise((resolve) => setTimeout(() => resolve("success"), 3000));
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
