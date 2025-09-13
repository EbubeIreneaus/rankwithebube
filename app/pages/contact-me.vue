<template>
  <main>
    <div class="py-20">
      <main-mini-hero heading="Contact Me" />
    </div>

    <div class="container">
      <main-contact-section />

      <div v-if="faq" class="mt-20">
        <MainFaq :faq="faq" />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { FaqTypes } from "~/types";

useHead({
  link: [{ rel: "canonical", href: "https://rankwithebube.com/contact-me" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: "Contact Me - Let's design a website that drives real growths.",
  description:
    "Get in touch with me today. WhatsApp: +234 806 198 2520, Email: hello@rankwithebube.com, address: Kubwa, Abuja, facebook: rankwithebube, twitter: @EbubeIreneaus",
  ogTitle: "Contact Me - Let's design a website that drives real growths.",
  ogDescription:
    "Get in touch with me today. WhatsApp: +234 806 198 2520, Email: hello@rankwithebube.com, address: Kubwa, Abuja, facebook: rankwithebube, twitter: @EbubeIreneaus",
  ogType: "website",
  ogUrl: "https://rankwithebube.com/contact-me",
  ogImage: "https://rankwithebube.com/og-about-image.png",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_NG",

  twitterCard: "summary",
  twitterTitle: "Contact Me - Let's design a website that drives real growths.",
  twitterDescription:
    "Get in touch with Me today. WhatsApp: +234 806 198 2520, Email: hello@rankwithebube.com, address: Kubwa, Abuja, facebook: rankwithebube, twitter: @EbubeIreneaus",
  twitterImage: "https://rankwithebube.com/og-about-image.png",
  twitterCreator: "@EbubeIreneaus",
});

const { data: faq, error } = await useFetch<
  { id: number; label: string; content: string }[]
>("/api/main/faq");
</script>

<style></style>
