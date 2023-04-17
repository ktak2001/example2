import { test, expect } from "@playwright/test";

test("Search", async ({ page }) => {
  await page.goto("/search?q=仏具");
  await new Promise((resolve) => setTimeout(() => resolve("success"), 3000));
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
