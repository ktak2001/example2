import { test, expect } from "@playwright/test";

test("Register", async ({ page }) => {
  await page.goto("/register");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
