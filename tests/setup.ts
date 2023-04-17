import { chromium, FullConfig } from "@playwright/test";

const setup = async (config: FullConfig) => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL + "login");
  await page
    .locator(":nth-match(input[name=email], 1)")
    .fill("cocopet@lab316.me");
  await page.locator(":nth-match(input[name=password], 1)").fill("c0c0p3t");
  await page.locator(":nth-match(button[type=submit], 1)").click();
  await page.waitForNavigation();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
};

export default setup;
