<template>
  <main class="">
    <div class="py-28 min-h-dvh container">
      <div
        v-if="project"
        class=" max-w-4xl mx-auto"
      >
        <div class="card-body">
          <div>{{ dayjs(project.createdAt).format("MMMM DD, YYYY") }}</div>
          <div v-html="project.content" class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl !text-slate-100"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { ProjectTypes } from "~/types";

const route = useRoute();

const {
  data: project,
  error,
  refresh,
} = await useFetch<ProjectTypes>(`/api/main/project/${route.params.slug}`);

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
      href: `https://rankwithebube.com/project/${route.params.slug}`,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  title: computed(() => project.value?.title),
  ogTitle: computed(() => project.value?.title),
  description: computed(() => project.value?.description),
  ogDescription: computed(() => project.value?.description),
  ogImage: computed(() => project.value?.previewImage),
  twitterImage: computed(() => project.value?.previewImage),
  twitterDescription: computed(() => project.value?.description),
  twitterTitle: computed(() => project.value?.title),
  twitterCard: "summary_large_image",
  ogImageWidth: 768,
  ogImageHeight: 768,
  ogSiteName: "Rank With Ebube",
  ogLocale: "en_US",
  ogImageAlt: computed(() => project.value?.title),
  ogUrl: computed(
    () => `https://rankwithebube.com/project/${project.value?.slug}`
  ),
  ogType: "article",
  author: "Ebube Ireneaus",
  publisher: "Ebube Ireneaus",
  twitterCreator: "@EbubeIreneaus",
});

const timeout = ref<any>(null)

async function incrementViews() {
  try {
    await $fetch("/api/main/project/visit", {
      method: "POST",
      body: { source: project.value?.slug },
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  timeout.value = setTimeout(() => incrementViews(), 10000)
})

onBeforeUnmount(() => {
  clearTimeout(timeout.value)
})
</script>

<style scoped></style>
