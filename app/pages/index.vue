<template>
  <main>
    <MainHero />
    <MainAboutMyself />
    <MainMyServiceComp />

    <MainProjects :projects="data?.projects || []" />

    <div id="blog" class="card mb-32">
      <div class="card-body">
        <MainTitle title="Must Read" />
        <br />

        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-10">
          <MainSingleBlog
            :blog="bl"
            v-for="bl in data?.blogs || []"
            :key="bl.id"
          />
        </div>
      </div>
    </div>
    <MainReview :reviews="data?.reviews || []" />
    <MainFaq :faq="data?.faqs || []" />
    <MainContactSection />
    <MainNewsLetter />
  </main>
</template>

<script setup lang="ts">
import type { ProjectTypes, BlogTypes, ReviewTypes } from "~/types";

useHead({
  link: [{ rel: "canonical", href: "https://rankwithebube.com" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title:
    "Get a Website That Ranks, Converts, and Grows Your Business | Rank With Ebube",
  description:
    "Tired of websites that don’t bring results? I design and develop SEO-optimized websites that attract traffic, rank on Google, and turn visitors into loyal customers. Let’s build something that actually grows your business.",
  ogTitle:
    "Get a Website That Ranks, Converts, and Grows Your Business | Rank With Ebube",
  ogDescription:
    "Tired of websites that don’t bring results? I design and develop SEO-optimized websites that attract traffic, rank on Google, and turn visitors into loyal customers. Let’s build something that actually grows your business.",
  ogType: "website",
  ogUrl: "https://rankwithebube.com",
  ogImage: "https://rankwithebube.com/og-image.png",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",

  twitterCard: "summary",
  twitterTitle:
    "Get a Website That Ranks, Converts, and Grows Your Business | Rank With Ebube",
  twitterDescription:
    "Tired of websites that don’t bring results? I design and develop SEO-optimized websites that attract traffic, rank on Google, and turn visitors into loyal customers. Let’s build something that actually grows your business.",
  twitterImage: "https://rankwithebube.com/og-image.png",
  twitterCreator: "@EbubeIreneaus",
});

useSchemaOrg([
  defineWebSite({
    "@id": "https://rankwithebube.com/#website",
    name: "Rank With Ebube",
    url: "https://rankwithebube.com",
  }),

  defineWebPage({
    "@id": "https://rankwithebube.com/#webpage",
    name: "Get a Website That Ranks, Converts, and Grows Your Business",
    description:
      "Ebube Ireneaus builds SEO-optimized websites that attract traffic, rank high on Google, and convert visitors into customers. Let’s grow your business online.",
    url: "https://rankwithebube.com",
    isPartOf: { "@id": "https://rankwithebube.com/#website" },
  }),

  definePerson({
    "@id": "https://rankwithebube.com/#ebube",
    name: "Ebube Ireneaus",
    jobTitle: "Full-Stack Web Developer",
    url: "https://rankwithebube.com/about",
    image: "https://rankwithebube.com/images/ebube.webp",
    sameAs: [
      "https://linkedin.com/in/ebubeireneaus",
      "https://twitter.com/EbubeIreneaus",
    ],
    worksFor: {
      "@id": "https://rankwithebube.com/#organization",
    },
  }),

  defineOrganization({
    "@id": "https://rankwithebube.com/#organization",
    name: "Rank With Ebube",
    url: "https://rankwithebube.com",
    logo: "https://rankwithebube.com/logo.png",
    founder: {
      "@id": "https://rankwithebube.com/#ebube",
    },
  }),

  defineBreadcrumb({
    itemListElement: [
      {
        name: "Home",
        item: "https://rankwithebube.com",
      },
    ],
  }),

  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://rankwithebube.com/#webdev-service",
    name: "Web Development & SEO Optimization",
    description:
      "I design and build SEO-optimized websites that help businesses rank higher, convert better, and grow faster online.",
    serviceType: "Web Design, SEO Optimization, Business Websites",
    provider: {
      "@type": "Person",
      name: "Ebube Ireneaus",
      url: "https://rankwithebube.com/about",
    },
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "Ghana" },
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Worldwide" },
    ],
  },
]);

const { data, error } = await useAsyncData("homepage", async () => {
  const [projects, blogs, faqs, reviews] = await Promise.all([
    $fetch("/api/main/project") as unknown as ProjectTypes[],
    $fetch("/api/main/blog/all") as unknown as BlogTypes[],
    $fetch("/api/main/faq") as unknown as {
      id: number;
      label: string;
      content: string;
    }[],
    $fetch("/api/main/review") as unknown as ReviewTypes[],
  ]);
  return { projects, blogs, faqs, reviews };
});

if (error.value)
  throw createError({ ...error.value, message: error.value.statusMessage || 'Unknown server error' });
</script>

<style scoped></style>
