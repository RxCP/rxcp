import { clientPlugin, defineConfig } from '@vitebook/client/node';
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node';
import {
  defaultThemePlugin,
  DefaultThemeConfig,
} from '@vitebook/theme-default/node';

import Unocss from '@unocss/vite';
import { extractorSvelte } from '@unocss/core';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  plugins: [
    Unocss({
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
      ],
    }),
    svelteMarkdownPlugin(),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
  ],
  site: {
    title: 'RxCP UI',
    description: 'RxCP UI',
    theme: {},
  },
});
