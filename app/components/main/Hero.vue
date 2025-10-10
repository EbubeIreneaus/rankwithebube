<template>
  <section class="hero mb-24" aria-label="Hero section">
    <div class="hero-content flex-col lg:flex-row lg:items-end mt-16 lg:mt-20">
      <div
        class="flex lg:px-10 md:px-5 px-3 flex-col space-y-5 max-w-3xl order-2 lg:order-1"
      >
        <h1
          class="!font-playfair text-5xl font-bold text-left mb-3"
          data-aos="fade-up"
        >
          I Design custom, SEO-driven and High Perfoming websites for businesses
          & organizations across Nigeria
        </h1>
        <p
          class="text-justify !font-arial w-full text-lg mb-5"
          data-aos="fade-right"
        >
          I create affordable websites that rank on search engines, engage your
          customers, and drive real sales and growth for your business. Let’s
          build a website that doesn’t just look stunning — it delivers results.
        </p>

        <div class=" flex justify-center lg:justify-start mb-4">
          <ui-action-button label="Contact Me" />
        </div>
        <main-counterup />
      </div>
      <img
        srcset="
          /images/ebube-tr_204.webp 204w,
          /images/ebube-tr_280.webp 280w,
          /images/ebube-tr.webp     408w
        "
        sizes="(min-width: 1024px) 400px, (min-width:768px) 280px, 204px"
        class="size-60 md:size-70 lg:size-100 object-cover aspect-square object-top bg-primary order-1 lg:order-2"
        alt="Ebube Ireneaus Profile Photo transparent"
        loading="eager"
        width="400px"
        height="400px"
      />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
