<template>
  <UModal
    :dismissible="false"
    :close="{ icon: 'fa6-solid:xmark', color: 'error' }"
  >
    <template #title
      ><div class="font-roman">
        {{ action == "create" ? "Create New" : "Edit" }} Review
      </div></template
    >
    <template #body>
      <form>
        <UFormField label="Fullname" required class="mb-3">
          <UInput
            placeholder="name"
            v-model="form.name"
            variant="ghost"
            class="ring w-full rounded-sm"
          />
        </UFormField>
        <UFormField label="Review" required class="mb-5">
          <UTextarea
            placeholder="what did he say?"
            v-model="form.content"
            variant="ghost"
            class="ring w-full rounded-sm"
          />
        </UFormField>
        <div class="flex flex-wrap gap-5">
          <UButton
            label="save"
            variant="soft"
            color="neutral"
            :loading="is_submiting"
            @click="submit()"
          />
        </div>
      </form>
    </template>
  </UModal>
</template>

<script lang="ts">
import z from "zod";
import type { ReviewTypes } from "~/types";

const schema = z.object({
  name: z.string().min(1, { message: "name cannot be empty" }),
  content: z.string().min(1, { message: "content cannot be empty" }),
});
</script>

<script lang="ts" setup>
const emit = defineEmits(['close'])
const props = withDefaults(
  defineProps<{ review?: ReviewTypes; action?: "create" | "edit" }>(),
  {
    review: () => ({
      name: "",
      content: "",
      id: undefined as unknown as number,
      createdAt: undefined as unknown as Date,
      rating: 5,
    }),
    action: "create",
  }
);

const is_submiting = ref(false);
const toast = useToast();
const openModal = ref(false);

const { form, reset } = useForm({
  name: props.review.name,
  content: props.review.content,
});

async function submit() {
  try {
    is_submiting.value = true;
    const formData = form.value
    const api =
      props.action == "create"
        ? "/api/admin/review/create"
        : "/api/admin/review/edit?id=" + props.review.id;
    const res = await $fetch<{ success: boolean }>(api, {
      method: "POST",
      body: formData,
    });

    if (res.success) {
      toast.add({
        title: "Successful",
        description: "Product recorded successful",
        color: "success",
        icon: "fa6-solid:circle-check",
      });
      emit('close', formData)
    }
  } catch (error: any) {
    toast.add({
      description: error.statusMessage,
      title: "Error",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    is_submiting.value = false;
  }
}
</script>

<style></style>
