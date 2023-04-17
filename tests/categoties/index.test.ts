import { test, expect } from "@playwright/test";

test("Categories", async ({ page }) => {
  await page.goto("/categories");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
