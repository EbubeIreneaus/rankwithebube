<template>
  <main class="py-20 min-h-dvh container">
    <main-mini-hero heading="Blog" />
    <div class="max-w-2xl mx-auto mt-10">
      
      <div v-for="blog in blogs" :key="blog.id">
        <u-card class=" hover:shadow-md transition">
          <template #default>
            <div class="flex items-start gap-5">
              <img
                :src="blog.previewImage || '/logo-dark.png'"
                width="80"
                height="80"
                class="object-cover object-center rounded-md"
                alt="blog cover"
              />

              <div class="flex-grow space-y-2">

                <p class="text-xs text-gray-400">
                  <Icon
                    name="fa6-solid:calendar-days"
                    class="inline-block mr-1"
                    size="sm"
                  />
                  {{ dayjs(blog.createdAt).format("MMMM DD, YYYY") }}
                </p>

                <nuxt-link :to="`/blog/${blog.slug}`">
                  <h2
                    class="text-lg font-semibold capitalize text-gray-900 hover:text-primary cursor-pointer !font-arial"
                  >
                    {{ blog.title }}
                  </h2>
                </nuxt-link>

                <p class="text-sm text-gray-600 line-clamp-2">
                  {{ blog.description }}
                </p>

                <div
                  class="flex items-center justify-between text-xs text-gray-500 mt-2"
                >
                  <div class="flex items-center gap-1">
                    <!-- <Icon name="fa6-solid:eye" class="w-4 h-4" /> -->
                    <span>{{ blog.views ?? 10 }} views</span>
                  </div>

                  <u-button
                    :to="`/blog/${blog.slug}`"
                    :aria-label="`Read More on ${blog.title}`"
                    variant="soft"
                    color="neutral"
                    label="Read more →"
                  />
                    
                  
                </div>
              </div>
            </div>
          </template>
        </u-card>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { BlogTypes } from "~/types";
import dayjs from "dayjs";

useHead({
  link: [{ rel: "canonical", href: "https://rankwithebube.com/blog" }],
  htmlAttrs: {
    lang: 'en'
  },
});

useSeoMeta({
  title: "Website SEO, Design Tips & Business Growth Insights | Rank With Ebube Blog",
  description: "Explore powerful insights on website SEO, business-focused web design, and strategies that help you build, rank, and grow online. Fresh tips and expert advice from a full-stack developer who understands what your business needs.",
  
  ogTitle: "Website SEO, Design Tips & Business Growth Insights | Rank With Ebube Blog",
  ogDescription: "Explore powerful insights on website SEO, business-focused web design, and strategies that help you build, rank, and grow online. Fresh tips and expert advice from a full-stack developer who understands what your business needs.",
  ogType: "website",
  ogUrl: "https://rankwithebube.com/blog",
  ogImage: "https://rankwithebube.com/og-image.png",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",

  twitterCard: "summary",
  twitterTitle: "Website SEO, Design Tips & Business Growth Insights | Rank With Ebube Blog",
  twitterDescription: "Practical SEO advice, web design strategies, and growth tips for business owners. Learn how to build websites that rank, convert, and drive real results.",
  twitterImage: "https://rankwithebube.com/og-image.png",
  twitterCreator: "@EbubeIreneaus",
})

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    '@id': 'https://rankwithebube.com/blog#webpage',
    name: 'Blog | Rank With Ebube',
    url: 'https://rankwithebube.com/blog',
    description:
      'Explore expert tips from Ebube Ireneaus on SEO, business-focused web development, and digital strategies that rank. Stay ahead with fresh insights tailored for business growth.',
    isPartOf: { '@id': 'https://rankwithebube.com/#website' },
  }),

  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Home',
        item: 'https://rankwithebube.com',
      },
      {
        name: 'Blog',
        item: 'https://rankwithebube.com/blog',
      },
    ],
  }),

  definePerson({
    '@id': 'https://rankwithebube.com/#ebube',
    name: 'Ebube Ireneaus',
    url: 'https://rankwithebube.com/about',
    jobTitle: 'Full-Stack Web Developer',
    image: 'https://rankwithebube.com/ebube-profile.webp',
    sameAs: [
      'https://twitter.com/EbubeIreneaus',
      'https://linkedin.com/in/ebubeireneaus',
    ],
  }),

  defineOrganization({
    '@id': 'https://rankwithebube.com/#organization',
    name: 'Rank With Ebube',
    url: 'https://rankwithebube.com',
    logo: 'https://rankwithebube.com/logo.webp',
    founder: {
      '@id': 'https://rankwithebube.com/#ebube',
    },
  }),
])

const {
  data: blogs,
  error,
  refresh,
} = await useFetch<BlogTypes[]>("/api/main/blog/all?len=100");

if (error.value)
  throw createError({
    statusMessage: "Unknown Server Error" + error.value.statusMessage,
    statusCode: 500,
  });

</script>

<style scoped></style>
