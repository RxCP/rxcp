/// <reference types="histoire" />

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { HstSvelte } from '@histoire/plugin-svelte';
import { defaultColors } from 'histoire';

import Unocss from '@unocss/vite';
import { extractorSvelte } from '@unocss/core';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';

const config = {
  // export default defineConfig({

  plugins: [
    svelte(),
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
  ],
  histoire: {
    plugins: [HstSvelte()],
    setupFile: '/histoire.setup.js',
    tree: {
      groups: [
        {
          id: 'top',
          title: '',
        },
      ],
    },
    theme: {
      title: 'Oneezy',
      logo: {
        square: '/assets/logo.svg',
        light: '/assets/logo.svg',
        dark: '/assets/logo.svg',
      },
      logoHref: '/',
      favicon: './assets/favicon.png',

      colors: {
        gray: defaultColors.gray,
        primary: defaultColors.blue,
      },
    },
  },
};

export default config;
