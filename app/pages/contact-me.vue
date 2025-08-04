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
  title: "Contact Ebube | Let's Build a Website That Ranks and Converts",
  description:
    "Have a project or idea in mind? Get in touch with Ebube Ireneaus today. I help businesses build SEO-optimized websites that drive traffic, attract customers, and grow online. Let's talk!",
  ogTitle: "Contact Ebube | Let's Build a Website That Ranks and Converts",
  ogDescription:
    "Have a project or idea in mind? Get in touch with Ebube Ireneaus today. I help businesses build SEO-optimized websites that drive traffic, attract customers, and grow online. Let's talk!",
  ogType: "website",
  ogUrl: "https://rankwithebube.com/contact-me",
  ogImage: "https://rankwithebube.com/og-about-image.png",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",

  twitterCard: "summary",
  twitterTitle: "Contact Ebube | Let's Build a Website That Ranks and Converts",
  twitterDescription:
    "Have a project or idea in mind? Get in touch with Ebube Ireneaus today. I help businesses build SEO-optimized websites that drive traffic, attract customers, and grow online. Let's talk!",
  twitterImage: "https://rankwithebube.com/og-about-image.png",
  twitterCreator: "@EbubeIreneaus",
});

const { data: faq, error } = await useFetch<
  { id: number; label: string; content: string }[]
>("/api/main/faq");
</script>

<style></style>
