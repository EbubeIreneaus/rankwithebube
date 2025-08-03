<template>
  <section aria-label="clients review section" class="container mb-32" id="review-section">
    <div class="">
      <div class="my-10 flex justify-between items-center">
        <MainTitle title="Clients Review" />
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

      <div class="review-container">
        <div class="swiper-wrapper grid grid-cols-2 gap-x-1 gap-y-4">
          <div
            class="swiper-slide"
            v-for="(review, index) in reviews"
            :key="index"
          >
            <blockquote class="flex flex-col items-center p-4">
              <p
                class="max-w-4xl text-xl font-medium text-center text-slate-100 md:text-2xl"
              >
                " {{ review.content }} "
              </p>
              <footer class="flex items-center gap-3 mt-6 md:mt-12">
                <a
                  href=""
                  target="_blank"
                  class="inline-block font-bold tracking-tight"
                >
                  <p class="text-slate-300 italic">{{ review.name }}</p>
                </a>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import type { ReviewTypes } from "~/types";

const props = defineProps<{
  reviews: ReviewTypes[];
}>();

const swiperRef = ref<Swiper | null>(null);

const swiperNext = () => {
  swiperRef.value?.slideNext();
};

const swiperPrev = () => {
  swiperRef.value?.slidePrev();
};

onMounted(() => {
  swiperRef.value = new Swiper(".review-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    
  });
});
</script>

<style></style>
