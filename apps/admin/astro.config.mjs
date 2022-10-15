import { defineConfig } from 'astro/config';

import { presetScrollbar } from 'unocss-preset-scrollbar';
import svelte from '@astrojs/svelte';

import uno from 'astro-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { extractorSvelte } from '@unocss/core';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: { port: 8080 },
  integrations: [
    uno({
      theme: {
        fontSize: {
          xs: '0.625rem',
        },
      },
      shortcuts: {
        'app-scrollbar':
          'scrollbar scrollbar-rounded scrollbar-track-color-transparent scrollbar-thumb-color-slate-200 dark:scrollbar-thumb-color-slate-800',
      },
      extractors: [extractorSvelte],
      presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: [
              {
                name: 'Inter',
                weights: ['400', '500', '700'],
                italic: true,
              },
              {
                name: 'sans-serif',
                provider: 'none',
              },
            ],
          },
        }),
        presetAttributify({
          prefix: 'un-',
          prefixedOnly: true,
        }),
        presetScrollbar(),
      ],
      transformers: [transformerVariantGroup()],
    }),
    svelte(),
  ],
});
