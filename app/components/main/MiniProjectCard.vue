<template>
  <div class="card rounded-xl bg-slate-950" data-aos="fade-up">
    <div class="card-body flex flex-col h-full">
      <img
        :src="project.previewImage"
        :alt="`portfolio project - ${project.title}`"
        class="aspect-[3/2] object-cover object-top mx-auto"
        width="450"
        height="300"
        loading="lazy"
      />
      <div>
        <h3
          class="text-xl font-semibold !font-arial my-3 line-clamp-2 text-ellipsis"
        >
          {{ project.title }}
        </h3>
        <u-button
          :to="`/project/${project.slug}`"
          class=""
          variant="soft"
          color="secondary"
          :aria-label="`more details on ${project.title}`"
          label="More Details"
          size="lg"
          trailing-icon="mdi:arrow-collapse-right"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Projects } from "~/lib/projects";
import type { ProjectTypes } from "~/types";
defineProps<{
  project: ProjectTypes;
}>();
</script>

<style scoped></style>
