<template>
  <div>
    <div class="hero ">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold !font-playfair">{{ heading }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{heading: string}>()
</script>

<style></style>
