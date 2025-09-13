<template>
  <main class="py-20 min-h-dvh container">
    <main-mini-hero heading="My Projects" />
    <div class="mx-auto mt-10 grid lg:grid-cols-3 sm:grids-cols-2 gap-4">
      <div v-for="project in projects" :key="project.id">
        <main-mini-project-card :project="project" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { ProjectTypes } from "~/types";

const {
  data: projects,
  error,
  refresh,
} = await useFetch<ProjectTypes[]>("/api/main/project?len=100");

if (error.value)
  throw createError({
    statusMessage: "Unknown Server Error" + error.value.statusMessage,
    statusCode: 500,
  });

useHead({
  link: [{ rel: "canonical", href: "https://rankwithebube.com/portfolio" }],
  htmlAttrs: {
    lang: 'en'
  },
});

useSeoMeta({
  title: "Website Portfolio | Business-Focused Projects | Rank With Ebube",
  description:
    "Explore a portfolio of SEO-optimized, responsive websites built for real businesses. See how I help brands grow online through custom design, smart strategy, and technical excellence.",

  ogTitle:
    "SEO Website Portfolio | Business-Focused Projects | Rank With Ebube",
  ogDescription:
    "Explore a portfolio of SEO-optimized, responsive websites built for real businesses. See how I help brands grow online through custom design, smart strategy, and technical excellence.",
  ogType: "website",
  ogUrl: "https://rankwithebube.com/portfolio",
  ogImage: "https://rankwithebube.com/og-image.png",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",

  twitterCard: "summary",
  twitterTitle:
    "SEO Website Portfolio | Business-Focused Projects | Rank With Ebube",
  twitterDescription:
    "Browse results-driven website projects built for businesses that needed more than just a pretty design. Get inspired by what’s possible.",
  twitterImage: "https://rankwithebube.com/og-image.png",
  twitterCreator: "@EbubeIreneaus",
});

</script>

<style scoped></style>
