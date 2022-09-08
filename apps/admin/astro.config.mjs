import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import uno from "astro-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";

// https://astro.build/config
export default defineConfig({
  server: { port: 8080 },
  integrations: [
    uno({
      presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
          provider: "google",
          fonts: {
            sans: [
              {
                name: "Inter",
                weights: ["400", "500", "700"],
                italic: true,
              },
              {
                name: "sans-serif",
                provider: "none",
              },
            ],
          },
        }),
        presetAttributify({
          prefix: "un:",
          prefixedOnly: true,
        }),
      ],
    }),
    svelte(),
  ],
});
