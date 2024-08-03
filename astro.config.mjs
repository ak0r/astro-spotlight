import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), pagefind()],
  site: "https://astro-spotlight.pages.dev",
  domains: ["picsum.photos"],
  build: {
    format: "file",
  },
});