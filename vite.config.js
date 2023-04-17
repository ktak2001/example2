import { defineConfig } from "vite";
import hydrogen from "@shopify/hydrogen/plugin";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [hydrogen(), svgr()],
});
