<template>
  <u-button
  :to="to"
  :label="label"
  size="xl"
  variant="soft"
  trailing-icon="mdi:arrow-right-bold"
  color="secondary"
  class="w-full max-w-[300px] !justify-center text-center py-3 px-6 rounded-xl"
/>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ label?: string; to?: string }>(), {
  label: "Contact Me",
  to: "/contact-me",
});
</script>

<style></style>
