<template>
  <UModal
    :dismissible="false"
    :close="{ icon: 'fa6-solid:xmark', color: 'error' }"
    
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
import type { NewFaqTypes } from "~/types";
const props = withDefaults(
  defineProps<{ faq?: NewFaqTypes; action?: "create" | "edit" }>(),
  {
    faq: () => ({ question: "", answer: "", id: undefined }),
    action: "create",
  }
);

const is_submiting = ref(false);
const toast = useToast();
const openModal = ref(false);

const { form, reset } = useForm({
  question: props.faq.question,
  answer: props.faq.answer,
});

async function submit() {
  try {
    is_submiting.value = true;

    const api = props.action =='create' ? '/api/admin/faq/create': '/api/admin/faq/edit'
    const res = await $fetch<{ success: boolean }>(api, {
      method: "POST",
      body: props.action == 'create' ? {...form.value} : {...form.value, id: props.faq.id}
    });

    if (res.success) {
      toast.add({
        title: "Successful",
        description: "FAQ updated successful",
        color: "success",
        icon: "fa6-solid:circle-check",
      });
      openModal.value = false;
      return;
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
