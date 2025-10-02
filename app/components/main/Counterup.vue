<template>
  <ClientOnly>
    <div class="flex justify-evenly items-center">
      <div
        class="text-center py-3 px-5 bg-green-600/50 text-green-300 rounded-md w-full rounded-r-none"
      >
        <i-count-up
          end-val="99"
          class="text-3xl font-bold"
          :options="{
            suffix: '%',
            enableScrollSpy: true,
            scrollSpyOnce: true,
          }"
        />
        <p class="font-playfair">Success Rate</p>
      </div>

      <div
        class="text-center py-3 px-5 bg-secondary/50 text-yellow-300 rounded-md rounded-l-none w-full"
      >
        <i-count-up
          end-val="10"
          class="text-3xl font-bold"
          :options="{
            suffix: '+',
            enableScrollSpy: true,
            scrollSpyOnce: true,
          }"
        />
        <p class="font-playfair">Happy Clients</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ClientOnly } from "#components";
import ICountUp from "vue-countup-v3";
</script>

<style></style>
