<!-- components/AdminBreadcrumb.vue -->
<template>
  <div class="breadcrumb-wrapper w-full mb-12 mt-2">
    <h2 class="breadcrumb-title text-3xl front-extrabold !font-arial uppercase mb-1.5">{{ label }}</h2>
    <UBreadcrumb :items="items" :ui="{
      linkLabel:'text-slate-300 hovr:text-secondary'
    }" />
  </div>
</template>

<script setup lang="ts">

const props= defineProps<{
  items: {label: string, to: string}[],
  label: string
}>()
</script>

<style scoped>
.breadcrumb-wrapper {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
