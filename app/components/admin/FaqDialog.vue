<template>
  <UModal
    :dismissible="false"
    :close="{ icon: 'fa6-solid:xmark', color: 'error' }"
    v-model:open="openModal"
    ref='modal'
  >
    <template #title
      ><div class="font-roman">
        {{ action == "create" ? "Create New" : "Edit" }} FAQ
      </div></template
    >
    <template #body>
      <form>
        <UFormField label="Question" required class="mb-3">
          <UInput
            placeholder="Question"
            v-model="form.question"
            variant="ghost"
            class="ring w-full rounded-sm"
          />
        </UFormField>
        <UFormField label="Answer" required class="mb-5">
          <UTextarea
            placeholder="Answer"
            v-model="form.answer"
            variant="ghost"
            class="ring w-full rounded-sm"
          />
        </UFormField>
        <div class="flex flex-wrap gap-5">
          <u-button
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

<script lang="ts" setup>
import type { NewFaqTypes, FaqTypes } from "~/types";
const emit = defineEmits(['close'])
const props = withDefaults(
  defineProps<{ faq?: FaqTypes; action?: "create" | "edit",  }>(),
  {
    faq: () => ({
      question: "",
      answer: "",
      id: undefined as unknown as number,
      createdAt: undefined as unknown as Date,
    }),
    action: "create",
  }
);

const is_submiting = ref(false);
const toast = useToast();
const openModal = ref(false);

const { form} = useForm({
  question: props.faq.question,
  answer: props.faq.answer,
});

async function submit() {
  try {
    is_submiting.value = true;
    const formData = form.value
    const api =
      props.action == "create"
        ? "/api/admin/faq/create"
        : "/api/admin/faq/edit?id="+props.faq.id;
    const res = await $fetch<{ success: boolean }>(api, {
      method: "POST",
      body: formData
    });

    if (res.success) {
      toast.add({
        title: "Successful",
        description: "FAQ updated successful",
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
