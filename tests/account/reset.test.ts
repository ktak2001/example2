import { test, expect } from "@playwright/test";

test("Reset", async ({ page }) => {
  await page.goto("/account/reset/1/2");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
