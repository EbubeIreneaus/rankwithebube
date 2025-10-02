<template>
  <u-container as="section">
     <div class="my-10 mx-auto">
      <div class="mb-5 flex justify-center">
        <main-title title="Why Choose Me" />
      </div>
     </div>
     <div class="flex flex-col md:flex-row md:flex-wrap lg:gap-7 gap-3 lg:flex-row lg:flex-nowrap">
      <u-card class="w-full">
        <nuxt-img src="/images/icon/performance.png" alt="100% high perfomance icon" format="webp" width="50" height="50" />
        <h3 class="text-2xl !font-playfair my-2">Performance & Speed First</h3>
        <p class="text-sm">I use modern frameworks like Nuxt.js & Vue.js to create fast, secure, and responsive websites that provide an excellent user experience on any device.</p>
      </u-card>
      <u-card class="ring ring-secondary w-full lg:scale-110">
        <nuxt-img src="/images/icon/solution.png" alt="Tailored solution icon" format="webp" width="50" height="50" />
        <h3 class="text-2xl !font-playfair my-2">Tailored Solutions</h3>
        <p class="text-sm">Every business is unique, so I design websites that reflect your brand identity while solving your specific challenges.</p>
      </u-card>
      <u-card class="w-full">
        <nuxt-img src="/images/icon/247.png" alt="24/7 support icon" format="webp" width="50" height="50" />
        <h3 class="text-2xl !font-playfair my-2">Ongoing Support</h3>
        <p class="text-sm">I don’t stop at launch, I provide guidance, maintenance, and updates to help your website grow alongside your business.</p>
      </u-card>
     </div>
  </u-container>
</template>

<script lang="ts" setup>

</script>

<style>

</style>