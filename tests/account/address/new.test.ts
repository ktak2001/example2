import { test, expect } from "@playwright/test";

test("NewAddress", async ({ page }) => {
  await page.goto("/account/address/new");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
