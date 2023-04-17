import { test, expect } from "@playwright/test";

test("ProductDetail", async ({ page }) => {
  await page.goto("/products/ペット仏具_おりん_商品1");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
