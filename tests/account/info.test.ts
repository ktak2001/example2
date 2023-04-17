import { test, expect } from "@playwright/test";

test("Info", async ({ page }) => {
  await page.goto("/account/info");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
