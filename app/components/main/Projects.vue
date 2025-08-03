<template>
  <section class="container mb-32" id="Rank-With-Ebube portfolio section">
    <div class="">
      <div class="my-10 flex justify-between items-center">
        <MainTitle title="My Portfolio" />
        <div class="flex gap-x-5">
        <u-button
            aria-label="slide previous"
            class="btn border-0 px-2.5 rounded-full"
            @click="swiperPrev()"
            :disabled="swiperRef?.isBeginning"
            icon="fa6-solid:arrow-left"
          />
           
          <u-button
            aria-label="slide next"
            class="btn border-0 px-2.5 rounded-full"
            @click="swiperNext()"
            :disabled="swiperRef?.isEnd"
            icon="fa6-solid:arrow-right"
          />
        </div>
      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper grid grid-cols-2 gap-x-1 gap-y-4">
          <div
            class="swiper-slide"
            v-for="(pr, index) in projects"
            :key="index"
          >
            <MainMiniProjectCard :project="pr" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import type { ProjectTypes } from "~/types";

const props = defineProps<{
  projects: ProjectTypes[]
}>()

const swiperRef = ref<Swiper | null>(null);

const swiperNext = () => {
  swiperRef.value?.slideNext();
};

const swiperPrev = () => {
  swiperRef.value?.slidePrev();
};

onMounted(() => {
  swiperRef.value = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
});
</script>

<style></style>
