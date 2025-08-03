<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center px-5">
    <UCard class="max-w-md w-full">
      <template #header>
        <h2 class="text-lg font-bold text-primary">Welcome Back</h2>
      </template>
      <UFormField label="Email" class="mb-3">
        <UInput
          placeholder="Email"
          v-model="form.email"
          variant="ghost"
          class="w-full ring ring-slate-200/30 rounded-lg"
          type="email"
        />
      </UFormField>

      <UFormField label="Password" class="mb-10">
        <UInput
          placeholder="Password"
          v-model="form.password"
          type="password"
          variant="ghost"
          class="w-full ring ring-slate-200/30 rounded-lg"
        />
      </UFormField>

      <UButton
        label="Login"
        @click="Login()"
        icon="fa6-solid:arrow-right-to-bracket"
        :loading="isLoading"
        variant="soft"
        color="neutral"
      />

      <template #footer>
        <nuxt-link to="/" class="text-sm text-center text-secondary block">
          Visit Website
        </nuxt-link>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
const isLoading = ref(false);
const { form, reset } = useForm({ email: "", password: "" });
const toast = useToast();
const router = useRouter();

async function Login() {
  try {
    isLoading.value = true;
    const res = await $fetch<{ success: boolean }>("/api/admin/auth/login", {
      method: "POST",
      body: form.value,
    });
    if (res.success) {
      return router.push("/admin/");
    }
  } catch (error: any) {
    return toast.add({
      title: error.statusMessage || "Unknown server Error",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    reset();
    isLoading.value = false;
  }
}
</script>

<style></style>
