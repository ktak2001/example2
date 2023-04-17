import { test, expect } from "@playwright/test";

test("Cart", async ({ page }) => {
  await page.goto("/cart");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
