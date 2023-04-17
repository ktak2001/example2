import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "http://localhost:3000/",
    storageState: ".state.json",
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.1,
    },
  },
  webServer: {
    command: "yarn dev",
    url: "http://localhost:3000/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "iPhone 13",
      use: { ...devices["iPhone 13"] },
    },
  ],
  reporter: process.env.CI ? "github" : "list",
  snapshotDir: ".snapshots",
  globalSetup: require.resolve("./tests/setup"),
};

export default config;
