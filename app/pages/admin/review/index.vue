<template>
  <div class="container py-10">
    <admin-breadcrumbs
      label="Client Reviews"
      :items="[
        { label: 'Admin', to: '/admin/' },
        { label: 'Client Reviews', to: '/admin/review/' },
      ]"
    />

    <div class="max-w-4xl mx-auto">
      <u-accordion
        type="multiple"
        :items="reviews"
        :ui="{
          label: 'text-xl font-bold text-white',
          root: 'card-xs rounded-2xl card-body bg-slate-950',
        }"
      >
        <template #body="{ item }">
          <div class="space-y-3">
            <p>{{ item.content }}</p>
            <div class="flex gap-x-4 items-center">
              <u-button
                label="Edit"
                icon="fa6-solid:pen"
                size="sm"
                variant="ghost"
                color="neutral"
                @click="openDialog('edit', item)"
              />
              <u-button
                label="Delete"
                variant="soft"
                color="error"
                size="sm"
                icon="fa6-solid:trash-can"
                @click="deleteREVIEW(item.id)"
                :loading="isDeleting == item.id"
              />
            </div>
          </div>
        </template>
      </u-accordion>
    </div>

    <u-button
      class="fixed rounded-full bottom-10 right-10 p-5 shadow-sm shadow-secondary/20 transition-all duration-300 ease-linear hover:rotate-90 hover:shadow-secondary"
      icon="fa6-solid:plus"
      color="neutral"
      variant="soft"
      size="xl"
      @click="openDialog('create')"
    />
  </div>
</template>

<script setup lang="ts">
import ReviewDialog from "~/components/admin/ReviewDialog.vue";
import type { ReviewTypes } from "~/types";
definePageMeta({
  layout: "admin",
});

const isDeleting = ref<number | null>(null);
const toast = useToast();

const dialog = useOverlay().create(ReviewDialog);
const reviews = computed(() => {
  return (
    data.value?.map((review) => ({
      ...review,
      label: review.name,
      content: review.content,
    })) || []
  );
});

const { data, error, refresh } = await useFetch<ReviewTypes[]>(
  "/api/admin/review/all"
);

if (error.value)
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
  });

async function openDialog(action: "create" | "edit", item?: any) {
  const props: any = { action };
  if (item) {
    props.review = {
      ...item,
      name: item.label,
      content: item.content,
      id: item.id,
    };
  }

  const instance = dialog.open({ ...props });

  let result = await instance.result;

  if (result && data.value) {
    if (action == "edit") {
      result = toRaw(result);
      const copy = data.value.slice();
      const index = copy.findIndex((x) => x.id === props.review.id) as number;
      copy[index] = {
        ...props.review,
        name: result.name,
        content: result.content,
      };
      data.value = copy;
    } else {
      refresh();
    }
  }

  if (result) {
  }
}

async function deleteREVIEW(id: number) {
  try {
    if (!confirm("Are you sure")) return false;
    isDeleting.value = id;
    const res = await $fetch<{ success: boolean }>(
      `/api/admin/review/delete?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.success) {
      if(data.value){
        const copy = data.value.slice()
        const index = copy.findIndex((x) => x.id==id)
        if (index != -1) {
          copy.splice(index, 1)
          data.value = copy
        }
      }
      toast.add({
        title: "Deleted Successfully",
        icon: "fa6-solid:trash-can",
        color: "info",
      });
      
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
