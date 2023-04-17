import { test, expect } from "@playwright/test";

test("AccountDetail", async ({ page }) => {
  await page.goto("/account");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
