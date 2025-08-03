<script setup lang="ts">
import { MainTitle } from '#components';

</script>

<template>
  <section
    class="py-16 px-5 md:px-20 bg-base-100 text-white"
    id="about-preview"
  >
    <div class="grid md:grid-cols-2 gap-10 items-center">
      <!-- Text Content -->
      <div data-aos="fade-right">
        <div class="mb-4">
          <MainTitle title="More Than Just a Developer" />
        </div>
        <p class="text-subtitle1 leading-loose mb-6">
          I'm not just here to build you a beautiful website — I build platforms
          that drive traffic, rank on search engines, and generate real business
          growth. With a strategic approach to design, SEO, and performance, I
          craft tailored solutions that work hard for your brand.
        </p>
        <p class="text-subtitle1 leading-loose mb-6">
          From market research and competitive keyword planning to speed
          optimization and Google tracking — I handle the technical stuff so you
          can focus on running your business.
        </p>
        <nuxt-link
          to="/about"
          class="inline-block text-accent font-medium hover:underline"
        >
          Learn more →
        </nuxt-link>
      </div>

      <!-- Image -->
      <div data-aos="fade-left">
        <img
          src="/images/about/cta.webp"
          alt="business partnership handshake"
          class="rounded-xl shadow-lg w-full"
          width="400"
          height="350"
          loading="eager"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
