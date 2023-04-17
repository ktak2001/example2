import { test, expect } from "@playwright/test";

test("AddressList", async ({ page }) => {
  await page.goto("/account/address");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
