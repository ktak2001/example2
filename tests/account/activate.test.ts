import { test, expect } from "@playwright/test";

test("Activate", async ({ page }) => {
  await page.goto("/account/activate/[id]/[activationToken]");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
