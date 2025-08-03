<template>
  <div class="container py-10">
     <admin-breadcrumbs
          label="Edit Project"
          :items="[
            { label: 'Admin', to: '/admin' },
            {label: 'Project', to: '/admin/project'},
            {label: 'Edit Project', to: `/admin/project/${id}/edit`}
          ]"
        />
    <div class="flex flex-col lg:flex-row gap-x-5">
      <div class="flex-grow">
        <div>
          <u-input
            class="w-full text-white mb-4"
            placeholder="Project Title"
            size="xl"
            v-model="form.title"
          />
          <div>
            <admin-tip-tap-editor
              v-model="form.content"
              @set-preview-image="(src) => (form.previewImage = src)"
            />
          </div>
        </div>
      </div>

      <div class="lg:max-w-xs w-full card bg-primary rounded-2xl">
        <div class="card-body">
          <div>
            <u-form-field label="description" required class="mb-3">
              <u-textarea :rows="3" class="w-full" v-model="form.description" />
            </u-form-field>

            <u-form-field label="URL" required class="mb-3">
              <u-input
                type="url"
                inputmode="url"
                class="w-full"
                v-model="form.url"
                placeholder="https://example.com"
              />
            </u-form-field>

            <u-form-field label="Github" class="mb-3">
              <u-input
                type="url"
                inputmode="url"
                class="w-full"
                v-model="form.github"
                placeholder="https://github.com/example"
              />
            </u-form-field>

            <u-checkbox
              color="neutral"
              default-value="indeterminate"
              v-model="form.isLive as boolean"
              label="Is Live"
              class="mb-3"
            />

            <div class="mb-5">
              <p class="mb-2 text-white text-sm">Preview Image</p>
              <img
                :src="form.previewImage"
                class="aspect-[3/2] size-28 block bg-primary"
              />
            </div>

            <u-button
              label="Save"
              @click="save()"
              :disabled="isLoading"
              class="mx-4"
              color="neutral"
              variant="soft"
              size="xl"
            />

            <u-button
              label="Publish 🎯"
              @click="save(true)"
              :disabled="isLoading"
              class=""
              color="neutral"
              size="xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewProjectTypes } from "~/types";

definePageMeta({
  layout: "admin",
});

const { id } = useRoute().params;
// const router = useRouter()
const toast = useToast();
const isLoading = ref(false);
const { data, error } = await useFetch<NewProjectTypes>(
  `/api/admin/project/${id}`
);
if (error.value)
  throw createError({ ...error.value, message: error.value.statusMessage });

const { form, reset } = useForm<NewProjectTypes>(data.value as NewProjectTypes);

async function save(publish = false) {
  try {
    isLoading.value = true;

    toast.add({
      title: publish ? "Publishing" : "Saving",
      description: "please wait..",
      icon: "fa6-solid:clock",
      color: "info",
    });

    const res = await $fetch<{ success: boolean }>(
      `/api/admin/project/${id}/update`,
      {
        method: "POST",
        body: { ...form.value, published: publish },
      }
    );

    if (res.success) {
      if (publish) reset();
      return toast.add({
        title: "Successful",
        description: `Project ${publish ? "published" : "saved"} successfully`,
        icon: "fa6-solid:circle-check",
        color: "success",
      });
    }
  } catch (error: any) {
    console.log(error);
    return toast.add({
      title: "Failed",
      description:
        error.statusMessage ||
        "internal server error, check server log for more info",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
