<template>
  <div class="card max-w-sm bg-slate-950" data-aos="fade-up">
    <div class="card-body">
      <img
        :src="blog.previewImage"
        :alt="`${blog.title} preview photo`"
        class="w-full object-cover object-center aspect-[3/2]"
        width="450"
        height="300"
        loading="lazy"
      />
      <div>
        <div class="mb-2">
          <span class="text-slate-400">{{
            dayjs(blog.createdAt).format("MMMM DD, YYYY")
          }}</span>
        </div>
        <h2 class="text-xl mb-1 line-clamp-2 text-ellipsis !font-playfair">
          <strong>{{ blog.title }}</strong>
        </h2>
        <p class="line-clamp-2 mb-3">{{ blog.description }}</p>

        <u-button
          :to="`/blog/${blog.slug}`"
          class=""
          variant="soft"
          color="secondary"
          :aria-label="`Read more on ${blog.title}`"
          label="Read More"
          trailing-icon="fa6-solid:arrow-right"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { BlogTypes } from "~/types";

defineProps<{
  blog: BlogTypes;
}>();
</script>

<style scoped></style>
