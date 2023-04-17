import { test, expect } from "@playwright/test";

test("CategoryDetail", async ({ page }) => {
  await page.goto("/categories/サンプルコレクション");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
