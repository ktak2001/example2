import { test, expect } from "@playwright/test";

test("Orders", async ({ page }) => {
  await page.goto("/account/orders");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
