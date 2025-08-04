<template>
    <div data-aos="fade-up">
        <h2 class="text-5xl font-bold mb-3 !font-fredaricka">{{ title }}</h2>
        <div class="max-w-[100px] w-full bg-secondary py-0.5"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{title: string}>()
</script>

<style scoped>
h2 {
  font-style: normal;
}

</style>