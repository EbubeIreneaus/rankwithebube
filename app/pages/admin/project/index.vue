<template>
  <div class="p-5">
    <admin-breadcrumbs
      label="Project List"
      :items="[
        { label: 'Admin', to: '/admin' },
        { label: 'Projects', to: '/admin/project' },
      ]"
    />
    <div class="max-w-2xl mx-auto">
      <div v-for="project in ProjectPosts" :key="project.id">
        <u-card class="px-4">
          <template #default>
            <div class="flex items-start gap-5">
              <img
                :src="project.previewImage || '/logo.webp'"
                width="80"
                height="80"
                class="object-cover object-center rounded-md"
              />

              <div class="flex-grow space-y-4">
                <div>
                  <h2
                    class="text-xl font-semibold capitalize mb-2 line-clamp-1 text-ellipsis"
                  >
                    {{ project.title }}
                  </h2>
                  <p class="text-sm text-gray-500 line-clamp-2 text-ellipsis">
                    {{ project.description }}
                  </p>
                </div>

                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <div class="flex items-center gap-1">
                    <Icon name="fa6-solid:eye" class="w-4 h-4" />
                    <span>{{ project.views ?? 0 }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <u-switch
                      v-model="project.published"
                      color="success"
                      size="sm"
                      @change="togglePublish(project)"
                    />
                    <span>{{ project.published ? "Published" : "Draft" }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3 text-sm">
                <u-button
                  icon="i-heroicons-pencil-square"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  :to="`/admin/project/${project.id}/edit`"
                >
                  Edit
                </u-button>

                <u-button
                  icon="i-heroicons-trash"
                  variant="soft"
                  color="error"
                  size="sm"
                  @click="deleteProject(project)"
                  :loading="isDeleting == project.id"
                >
                  Delete
                </u-button>

                <u-button
                  icon="i-heroicons-link"
                  size="sm"
                  color="success"
                  variant="soft"
                  @click="copyLink(project.slug)"
                >
                  Copy Link
                </u-button>
              </div>
            </div>
          </template>
        </u-card>
      </div>
    </div>
    <u-button
      class="fixed rounded-full bottom-10 right-10 p-5 shadow-sm shadow-secondary/20 transition-all duration-300 ease-linear hover:rotate-90 hover:shadow-secondary"
      icon="fa6-solid:plus"
      color="neutral"
      variant="soft"
      size="xl"
      to="/admin/project/create"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProjectTypes } from "~/types";

definePageMeta({
  layout: "admin",
});

const isToggling = ref<number | null>(null);
const isDeleting = ref<number | null>(null);
const toast = useToast();

const {
  data: ProjectPosts,
  error,
  refresh,
} = useFetch<ProjectTypes[]>("/api/admin/project/all");

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.statusMessage,
  });
}

async function togglePublish(project: ProjectTypes) {
  try {
    isToggling.value = project.id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/project/${project.id}/update`,
      {
        method: "POST",
        body: { published: project.published },
      }
    );

    if (res.success) {
      refresh();
    }
  } catch (error: any) {
    toast.add({
      title: "Failed",
      description:
        error.statusMessage ||
        "internal server error, check server log for more info",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    isToggling.value = null;
  }
}

async function copyLink(slug: string) {
  navigator.clipboard.writeText(slug);
  toast.add({
    description: "copied.",
    icon: "fa6-solid:circle-check",
    color: "info",
  });
}

async function deleteProject(project: ProjectTypes) {
  try {
    isDeleting.value = project.id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/project/${project.id}/delete`,
      {
        method: "DELETE",
      }
    );

    if (res.success) {
      toast.add({
        title: "Deleted Successfully",
        icon: "fa6-solid:trash-can",
        color: "info",
      });
      return refresh();
    }
  } catch (error: any) {
    toast.add({
      title: "Failed",
      description:
        error.statusMessage ||
        "internal server error, check server log for more info",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    isDeleting.value = null;
  }
}
</script>

<style scoped></style>
