<template>
  <div class="container py-10">
     <admin-breadcrumbs
              label="Create Blog Post"
              :items="[
                { label: 'Admin', to: '/admin' },
                {label: 'Blog', to: '/admin/blog'},
                {label: 'Create Blog Post', to: `/admin/blog/create`}
              ]"
            />

    <div class="flex flex-col lg:flex-row gap-x-5">
      <div class="flex-grow">
        <div>
          <u-input
            class="w-full text-white mb-4"
            placeholder="Blog Title"
            size="xl"
            v-model="form.title"
          />
          <div>
            <admin-tip-tap-editor v-model="form.content" @set-preview-image="(src) => form.previewImage = src" />
          </div>
        </div>
      </div>

      <div class="lg:max-w-xs w-full card bg-primary rounded-2xl">
       <div class="card-body">
         <div>
          <u-form-field label="description" required class="mb-3">
            <u-textarea :rows="3" class="w-full" v-model="form.description" />
          </u-form-field>

          <u-form-field label="Category" class="mb-3">
            <u-select :items="['business', 'tech']" class="w-full" v-model="form.category as 'business' | 'tech' "  />
          </u-form-field>

          <div class="mb-5">
            <p class="mb-2 text-white text-sm">Preview Image</p>
            <img :src="form.previewImage" class="aspect-[3/2] size-28 block bg-primary" />
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
import type { NewBlogTypes} from "~/types";

definePageMeta({
  layout: "admin",
});

const toast = useToast()
const isLoading = ref(false)
const { form, reset } = useForm<NewBlogTypes>({
  slug: '',
  title: "",
  content: "",
  previewImage: "",
  description: "",
  category: 'business' as 'business' | 'tech'
});

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
      "/api/admin/blog/create",
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
