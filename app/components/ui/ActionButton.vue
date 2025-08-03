<template>
  <u-button
    :to="to"
    :label="label"
    size="xl"
    variant="soft"
    trailing-icon="mdi:arrow-right-bold"
    color="secondary"
    class="py-3 px-10 rounded-xl"
  />
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ label?: string; to?: string }>(), {
  label: "Contact Me",
  to: "/#contact",
});
</script>

<style></style>
