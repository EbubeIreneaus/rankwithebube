<template>
    <div>
        <h5 class="text-4xl font-bold mb-3" :class="cls">{{ title }}</h5>
        <div class="max-w-[100px] w-full bg-secondary py-0.5"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{title: string, cls?: string}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Fredericka+the+Great&display=swap');
h5 {
font-family: "Fredericka the Great", serif;

  font-style: normal;
}

</style>