<template>
    <div data-aos="fade-up">
        <h2 class="text-5xl font-bold mb-3">{{ title }}</h2>
        <div class="max-w-[100px] w-full bg-secondary py-0.5"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{title: string}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Fredericka+the+Great&display=swap');
h2 {
font-family: "Fredericka the Great", serif;
 
  font-style: normal;
}

</style>