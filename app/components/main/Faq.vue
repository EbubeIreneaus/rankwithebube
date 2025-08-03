<template>
  <div class="mb-24 container">
    <div class="mb-5 flex justify-center">
      <main-title title="Frequently Asked Questions" />
    </div>

    <div>
      <u-accordion model-value="0" :items="faq" :ui="{
        label:'text-xl font-arial font-bold text-slate-100',
        root: 'card-xs card-body bg-slate-950 rounded-xl py-3 px-5',
        content: 'text-slate-200 px-1'
      }" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  faq : {id: number, label: string, content: string}[]
}>()
</script>

<style></style>
