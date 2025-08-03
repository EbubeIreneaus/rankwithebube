<template>
  <section
    aria-label="Rank-With-Ebube contact section"
    id="contact-rankwithebube"
    class="card rounded-2xl bg-slate-950"
  >
    <div class="card-body">
      <form @submit.prevent="sendMsg">
        <div class="mb-4">
          <label for="fullname" class="font-semibold mb-1 block"
            >Fullname:</label
          >
          <input
            id="fullname"
            type="text"
            class="input w-full bg-slate-800 text-white rounded-xl"
            placeholder="fullname"
            v-model="form.name"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="font-semibold mb-1 block">Email:</label>
          <input
            id="email"
            type="email"
            class="input w-full bg-slate-800 text-white rounded-xl"
            placeholder="email"
            v-model="form.email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="subject" class="font-semibold mb-1 block">Subject:</label>
          <input
            id="subject"
            class="input w-full bg-slate-800 text-white rounded-xl"
            placeholder="Subject"
            v-model="form.subject"
            required
          />
        </div>
        <div class="mb-4">
          <label for="message" class="font-semibold mb-1 block">Message:</label>
          <textarea
            id="message"
            class="textarea bg-slate-800 rounded-xl text-white"
            rows="2"
            v-model="form.content"
            required
          ></textarea>
        </div>
        <u-button
          :loading="isLoading"
          type="submit"
          variant="soft"
          color="secondary"
          label="submit"
          aria-label="submit form"
          icon="mdi:send"
          size="lg"
        />
        
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ToastError, ToastSuccess } from "~/lib/notify";

const isLoading = ref(false);
const toast = useToast();

const { form, reset } = useForm({
  name: "",
  email: "",
  subject: "",
  content: "",
});

async function sendMsg() {
  isLoading.value = true;

  try {
    const res = await $fetch<{success: boolean}>("/api/main/createMsg", {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      toast.add({
        title: "Recieved Successfully",
        description:
          "thanks for reaching out! We’ll get back to you shortly.",
        icon: "fa6-solid:circle-check",
        color: "success",
      });
      reset();
      return true;
    }
  } catch (error: any) {
    console.log(error);
    toast.add({
      title: "Message could not delivered 😥",
      description: error.statusMessage || "internal server error",
      icon: "fa6-solid:circle-xmark",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
