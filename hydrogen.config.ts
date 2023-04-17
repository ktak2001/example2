import { defineConfig, CookieSessionStorage } from "@shopify/hydrogen/config";

export default defineConfig({
  shopify: {
    defaultLanguageCode: "ja",
    defaultCountryCode: "jp",
    storeDomain: "coco-pet-dev.myshopify.com",
    storefrontToken: "4aafc527898705e5239585d8d3a6eea0",
    storefrontApiVersion: "2022-10",
  },
  session: CookieSessionStorage("__session", {
    expires: new Date(1749343178614),
  }),
  logger: {
    trace() {},
    debug() {},
    warn() {},
  },
  serverErrorPage: "/src/500Error.tsx",
});
