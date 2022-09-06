import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";

import Unocss from "unocss/astro";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetWind from "@unocss/preset-wind";
import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";

// https://astro.build/config
export default defineConfig({
  server: { port: 8080 },
  integrations: [
    Unocss({
      presets: [
        presetWind(),
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
    solidJs(),
  ],
});
