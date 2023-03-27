// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // mode: 'spa',
  modules: ['@pinia/nuxt'],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  app: {
    pageTransition: { name: 'layout', mode: 'out-in' },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/main.scss";`,
        },
      },
    },
  },
  nitro: {
    plugins: ['@/server/index.js'],
  },
  runtimeConfig: {
    public: {
      MONGODB_URI: process.env.MONGODB_URI,
    },
  },
});
