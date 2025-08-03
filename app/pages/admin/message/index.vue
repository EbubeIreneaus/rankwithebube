<template>
  <div class="container py-10">
    <admin-breadcrumbs
      label="Messages"
      :items="[
        { label: 'Admin', to: '/admin/' },
        { label: 'messages', to: '/admin/message/' },
      ]"
    />

    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex flex-col md:flex-row justify-between gap-4 py-5"
      >
        <div class="flex-1">
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ msg.name }} •
            <span class="text-sm text-gray-500">{{ msg.email }}</span>
          </p>
          <p class="mt-1 text-sm font-medium text-primary-600">
            {{ msg.subject }}
          </p>
          <p class="mt-2 text-gray-700 dark:text-gray-300 text-sm">
            {{ msg.content }}
          </p>
        </div>

        <div class="flex items-start md:items-center gap-2">
          <UButton
            icon="fa6-solid:envelope"
            variant="soft"
            color="neutral"
            size="xs"
            @click="copyEmail(msg.email)"
          >
            Copy Email
          </UButton>
          <UButton
            icon="fa6-solid:trash-can"
            variant="soft"
            color="error"
            size="xs"
            @click="deleteMessage(msg.id)"
            :loading="isDeleting == msg.id"
          >
            Delete
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MessageTypes } from "~/types";

definePageMeta({
  layout: "admin",
});

const toast = useToast();
const isDeleting = ref<number | null>(null);

const { data: messages, error, refresh } = await useFetch<MessageTypes[]>(
  "/api/admin/message/all"
);
if (error.value)
  throw createError({ ...error.value, message: error.value.statusMessage });

function copyEmail(email: string) {
  navigator.clipboard.writeText(email);
  toast.add({
    description: "copied.",
    icon: "fa6-solid:circle-check",
    color: "info",
  });
}

async function deleteMessage(id: number) {
  try {
    if (!confirm("Are you sure")) return false;
    isDeleting.value = id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/message/delete?id=${id}`,
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
