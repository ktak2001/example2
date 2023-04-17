import { test, expect } from "@playwright/test";

test("OrderDetail", async ({ page }) => {
  await page.goto("/account/orders/5004315459821");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
