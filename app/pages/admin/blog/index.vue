<template>
  <div class="p-5">
    <admin-breadcrumbs
      label="Blog List"
      :items="[
        { label: 'Admin', to: '/admin' },
        { label: 'Blogs', to: '/admin/blog' },
      ]"
    />
    <div class="max-w-2xl mx-auto">
      <div v-for="blog in BlogPosts" :key="blog.id">
        <u-card class="px-4">
          <template #default>
            <div class="flex items-start gap-5">
              <img
                :src="blog.previewImage || '/logo.webp'"
                width="80"
                height="80"
                class="object-cover object-center rounded-md"
              />

              <div class="flex-grow space-y-4">
                <div>
                  <h2
                    class="text-xl font-semibold capitalize mb-2 line-clamp-1 text-ellipsis"
                  >
                    {{ blog.title }}
                  </h2>
                  <p class="text-sm text-gray-500 line-clamp-2 text-ellipsis">
                    {{ blog.description }}
                  </p>
                </div>

                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <div class="flex items-center gap-1">
                    <Icon name="fa6-solid:eye" class="w-4 h-4" />
                    <span>{{ blog.views ?? 0 }}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <u-switch
                      v-model="blog.published"
                      color="success"
                      size="sm"
                      :loading="isToggling == blog.id"
                      @change="togglePublish(blog)"
                    />
                    <span>{{ blog.published ? "Published" : "Draft" }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end gap-3 text-sm">
                <u-button
                  icon="i-heroicons-pencil-square"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  :to="`/admin/blog/${blog.id}/edit`"
                >
                  Edit
                </u-button>
                <u-button
                  icon="i-heroicons-trash"
                  variant="soft"
                  color="error"
                  size="sm"
                  @click="deleteBlog(blog)"
                  :loading="isDeleting == blog.id"
                >
                  Delete
                </u-button>
                <u-button
                  icon="i-heroicons-link"
                  size="sm"
                  color="success"
                  variant="soft"
                  @click="copyLink(blog.slug)"
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
      to="/admin/blog/create"
    />
  </div>
</template>

<script setup lang="ts">
import type { BlogTypes } from "~/types";

definePageMeta({
  layout: "admin",
});

const toast = useToast();
const isToggling = ref<number | null>(null);
const isDeleting = ref<number | null>(null);

const {
  data: BlogPosts,
  error,
  refresh,
} = useFetch<BlogTypes[]>("/api/admin/blog/all");

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.statusMessage,
  });
}

async function togglePublish(blog: BlogTypes) {
  try {
    isToggling.value = blog.id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/blog/${blog.id}/update`,
      {
        method: "POST",
        body: { published: blog.published },
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

async function deleteBlog(blog: BlogTypes) {
  try {
    isDeleting.value = blog.id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/blog/${blog.id}/delete`,
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
