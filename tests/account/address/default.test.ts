import { test, expect } from "@playwright/test";

test("DefaultAddress", async ({ page }) => {
  await page.goto("/account/address/default");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
