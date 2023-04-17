import { test, expect } from "@playwright/test";

test("Recover", async ({ page }) => {
  await page.goto("/account/recover");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
