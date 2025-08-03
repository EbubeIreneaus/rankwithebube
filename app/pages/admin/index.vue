<template>
 <main class="min-h-[calc(100dvh-70px)] w-full grid place-items-center px-4 py-10">
    <div class="w-full max-w-3xl space-y-6">

      <!-- Grid of Navigation Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <!-- Blogs -->
        <NuxtLink to="/admin/blog" class="group">
          <div class="rounded-xl p-6 bg-slate-950 text-white shadow-sm hover:shadow-md transition">
            <div class="flex flex-col items-center gap-3 text-center">
              <Icon name="i-heroicons-document-text" class="w-8 h-8 " />
              <span class="text-lg font-medium group-hover:text-secondary transition">Blogs</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Projects -->
        <NuxtLink to="/admin/project" class="group">
          <div class="rounded-xl p-6 bg-slate-950 text-white shadow-sm  hover:shadow-md transition">
            <div class="flex flex-col items-center gap-3 text-center">
              <Icon name="i-heroicons-briefcase" class="w-8 h-8 " />
              <span class="text-lg font-medium  group-hover:text-secondary transition">Projects</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Messages -->
        <NuxtLink to="/admin/message" class="group">
          <div class="rounded-xl p-6 bg-slate-950 text-white shadow-sm  hover:shadow-md transition">
            <div class="flex flex-col items-center gap-3 text-center">
              <Icon name="i-heroicons-chat-bubble-left-ellipsis" class="w-8 h-8" />
              <span class="text-lg font-medium group-hover:text-secondary transition">Messages</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/faq" class="group">
          <div class="rounded-xl p-6 bg-slate-950 text-white shadow-sm  hover:shadow-md transition">
            <div class="flex flex-col items-center gap-3 text-center">
              <Icon name="fa6-solid:question" class="w-8 h-8" />
              <span class="text-lg font-medium group-hover:text-secondary transition">FAQ</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/review" class="group">
          <div class="rounded-xl p-6 bg-slate-950 text-white shadow-sm  hover:shadow-md transition">
            <div class="flex flex-col items-center gap-3 text-center">
              <Icon name="fa6-solid:comments" class="w-8 h-8" />
              <span class="text-lg font-medium group-hover:text-secondary transition">Reviews</span>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>

<style scoped></style>
