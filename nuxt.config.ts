// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: "Ebube Ireneaus || Business Website Developer - Nigeria",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  modules: [
    "nuxt-aos",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/icon",
    "nuxt-nodemailer",
    "nuxt-schema-org",
  ],

  css: ["~/assets/css/style.css", "~/assets/css/tailwind.css"],

  runtimeConfig: {
    admin: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASS,
    },
    CLD_SECRET: process.env.CLD_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    public: {
      CLD_NAME: process.env.CLD_NAME,
      CLD_PUBLIC: process.env.CLD_PUBLIC,
    },
  },

  aos: {
    once: true,
  },

  nodemailer: {
    from: '"Rank With Ebube" <alfredebube7@gmail.com>',
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true,
    auth: {
      user: '7d8d53001@smtp-brevo.com',
      pass: '',
    },
  },

});