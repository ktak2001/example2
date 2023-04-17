import { test, expect } from "@playwright/test";

test("EditAddress", async ({ page }) => {
  await page.goto("/account/address/8037450416365/edit");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
