<template>
  <main class="">
    <div class="py-28 min-h-dvh container">
      <div v-if="blog" class="max-w-4xl mx-auto">
        <div class="card-body">
          <div>{{ dayjs(blog.createdAt).format("MMMM DD, YYYY") }}</div>
          <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl">
            <div v-html="blog.content"></div>
          </article>

          <div class="flex flex-col gap-2 mt-6">
            <h3 class="text-2xl font-bold">Enjoyed this post? Share it:</h3>
            <div class="flex items-center gap-4 text-base text-white">
              <u-button
                :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Share on Facebook"
                title="Share on Facebook"
                variant="soft"
                color="neutral"
                icon="fa6-brands:facebook-f"
              />

              <u-button
                :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                  blog.title
                )}`"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Share on Twitter"
                title="Share on Twitter"
                variant="soft"
                color="neutral"
                icon="fa6-brands:twitter"
              />

              <u-button
                :href="`https://wa.me/?text=${encodeURIComponent(
                  blog.title + ' ' + shareUrl
                )}`"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
                variant="soft"
                color="neutral"
                icon="fa6-brands:whatsapp"
              />

              <u-button
                :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                variant="soft"
                color="neutral"
                icon="fa6-brands:linkedin-in"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14">
        <div class="flex justify-center mb-5">
          <MainTitle title="Related Posts" />
        </div>
        <div v-for="blog in related" :key="blog.id">
          <u-card class="px-4">
            <template #default>
              <div class="flex items-start gap-5">
                <img
                  :src="blog.previewImage"
                  width="80"
                  height="80"
                  class="object-cover object-center rounded-md"
                />

                <div class="flex-grow space-y-4">
                  <div>
                    <NuxtLink :to="`/blog/${blog.slug}`">
                      <h2
                        class="text-xl font-semibold capitalize mb-2 line-clamp-1 text-ellipsis !font-arial underline underline-offset-4"
                      >
                        {{ blog.title }}
                      </h2>
                    </NuxtLink>
                    <p class="text-base text-gray-500 line-clamp-2 text-ellipsis">
                      {{ blog.description }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </u-card>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { BlogTypes } from "~/types";

const route = useRoute();
const shareUrl = computed(
  () => `https://rankwithebube.com/blog/${blog.value?.slug}`
);

const { data, error, refresh } = await useFetch<{
  blog: BlogTypes;
  related: BlogTypes[];
}>(`/api/main/blog/${route.params.slug}`);

const blog = computed(() => data.value?.blog);
const related = computed(() => data.value?.related);

if (error.value)
  throw createError({
    ...error.value,
    statusCode: error.value.statusCode || 500,
    message: error.value.statusMessage || "unknown server error",
  });

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://rankwithebube.com/blog/${route.params.slug}`,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

useSchemaOrg([
  defineWebPage({
    "@id": `https://rankwithebube.com${route.path}#webpage`,
    name: () => blog.value?.title,
    description: () => blog.value?.description,
    url: `https://rankwithebube.com${route.path}`,
    isPartOf: { "@id": "https://rankwithebube.com/#website" },
  }),

  defineArticle({
    "@type": "BlogPosting",
    "@id": `https://rankwithebube.com${route.path}#article`,
    headline: () => blog.value?.title,
    description: () => blog.value?.title,
    datePublished: blog.value?.createdAt
      ? new Date(blog.value.createdAt)
      : undefined,
    dateModified: blog.value?.updatedAt
      ? new Date(blog.value.updatedAt)
      : undefined,
    image: [() => blog.value?.previewImage],
    author: {
      "@id": "https://rankwithebube.com/#ebube",
    },
    mainEntityOfPage: {
      "@id": `https://rankwithebube.com${route.path}#webpage`,
    },
  }),

  definePerson({
    "@id": "https://rankwithebube.com/#ebube",
    name: "Ebube Ireneaus",
    url: "https://rankwithebube.com/about",
    jobTitle: "Full-Stack Developer",
    image: "https://rankwithebube.com/images/ebube.webp",
    sameAs: [
      "https://twitter.com/EbubeIreneaus",
      "https://linkedin.com/in/ebubeireneaus",
    ],
  }),

  defineOrganization({
    "@id": "https://rankwithebube.com/#organization",
    name: "Rank With Ebube",
    url: "https://rankwithebube.com",
    logo: "https://rankwithebube.com/logo.webp",
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
      {
        name: "Blog",
        item: "https://rankwithebube.com/blog",
      },
      {
        name: () => blog.value?.title,
        item: `https://rankwithebube.com${route.path}`,
      },
    ],
  }),
]);

useSeoMeta({
  title: computed(() => blog.value?.title),
  ogTitle: computed(() => blog.value?.title),
  description: computed(() => blog.value?.description),
  ogDescription: computed(() => blog.value?.description),
  ogImage: computed(() => blog.value?.previewImage),
  twitterCard: "summary",
  twitterImage: computed(() => blog.value?.previewImage),
  twitterTitle: computed(() => blog.value?.title),
  twitterDescription: computed(() => blog.value?.description),
  applicationName: "Ebube Ireneaus",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogImageAlt: computed(() => blog.value?.title),
  ogUrl: computed(() => `https://rankwithebube.com/blog/${blog.value?.slug}`),
  ogType: "article",
  author: "Ebube Ireneaus",
  publisher: "Ebube Ireneaus",
  twitterCreator: "@EbubeIreneaus",
});
</script>

<style scoped></style>
