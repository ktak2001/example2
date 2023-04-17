import { test, expect } from "@playwright/test";

test("Guides", async ({ page }) => {
  await page.goto("/guides");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
