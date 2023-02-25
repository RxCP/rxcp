import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_API_URL || 'http://127.0.0.1:3001',
      socketUrl: process.env.PUBLIC_SOCKET_URL || 'ws://127.0.0.1:3001'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        class: 'font-sans'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'RxCP'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  css: ['~/assets/scss/app.scss', '~/assets/scss/dark.scss'],

  // build modules
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt'
  ],

  unocss: {
    theme: {
      fontSize: {
        xs: '0.625rem'
      }
    },
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
              italic: true
            },
            {
              name: 'sans-serif',
              provider: 'none'
            }
          ]
        }
      }),
      presetAttributify({
        prefix: 'un-',
        prefixedOnly: true
      }),
      presetScrollbar()
    ],
    shortcuts: {
      'app-scrollbar':
        'scrollbar scrollbar-rounded scrollbar-track-color-transparent scrollbar-thumb-color-slate-200 dark:scrollbar-thumb-color-slate-800'
    },
    rules: []
  }
})
