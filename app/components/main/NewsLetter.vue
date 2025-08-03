<template>
  <section aria-label="newsletter secton" class="mx-auto mt-24 max-w-7xl px-6 lg:px-8 bg-slate-950">
    <div class="relative px-6 py-24 sm:px-24 xl:py-32">
      <h2
        class="mx-auto max-w-2xl text-center text-3xl font-bold !font-arial tracking-tight !text-secondary sm:text-4xl"
      >
        Stay In Touch
      </h2>

      <p class="mx-auto mt-2 max-w-xl text-center leading-8 text-gray-200">
        Get update on how to rank your business online
      </p>

      <form class="mx-auto mt-10 flex max-w-md" @submit.prevent="Subscribe()">
        <label for="email-address" class="sr-only">Email address</label>
        <u-input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          class="max-w-2xl w-full rounded-none"
          size="xl"
          required
          placeholder="Enter your email"
          v-model="form.email"
          :ui="{
            base: 'rounded-none rounded-l-xl',
          }"
        />

        <u-button
          type="submit"
          label="Subscribe"
          variant="soft"
          color="neutral"
          icon="mdi:bell-ring"
          class="rounded-none rounded-r-xl px-4"
          square
          :loading="isLoading"
        />
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const toast = useToast();
const { form, reset } = useForm({ email: "" });
const isLoading = ref(false);

async function Subscribe() {
  try {
    if (!form.value.email || form.value.email == "") return;
    isLoading.value = true;
    const res = await $fetch<{ success: boolean }>("/api/main/subscribe", {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      toast.add({
        description:
          "Thanks for joining our newsletter. Stay tuned for updates, insights, and more!",
        color: "info",
        icon: "mdi:email-newsletter",
      });
      return reset();
    }
  } catch (error: any) {
    toast.add({
      description: error.statusMessage || "internal server error",
      color: "error",
      icon: "mdi:cancel",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style></style>
