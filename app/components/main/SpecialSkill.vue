<script setup lang="ts">
import { CountUp } from 'countup.js';

const countOption = {
  startVal: 0,
  duration: 2,
  enableScrollSpy: true,
  scrollSpyOnce: true,
};

function counter() {
  new CountUp('counter1', 10, countOption);
  new CountUp('counter2', 50, countOption);
  new CountUp('counter3', 4, countOption);
}

onMounted(() => {
  counter();
});

const mySkills = [
  { name: 'html', src: 'html.png', alt: 'HTML Logo' },
  { name: 'css', src: 'css.png', alt: 'CSS Logo' },
  { name: 'javaScript', src: 'js.png', alt: 'JavaScript Logo' },
  { name: 'tailwind', src: 'tailwind.png', alt: 'Tailwindcss Logo' },
  { name: 'react', src: 'react.png', alt: 'React.js Logo' },
  { name: 'vue', src: 'vue.png', alt: 'vue.js Logo' },
  { name: 'nuxt', src: 'nuxt.png', alt: 'nuxt.js Logo' },
  { name: 'next', src: 'next.png', alt: 'Next.js Logo' },
  { name: 'typescript', src: 'ts.png', alt: 'typescript Logo' },
  { name: 'express', src: 'express.png', alt: 'express.js Logo' },
  { name: 'python', src: 'python.png', alt: 'python Logo' },
  { name: 'django', src: 'django.png', alt: 'django Logo' },
  { name: 'git', src: 'git.png', alt: 'git Logo' },
  { name: 'github', src: 'github.png', alt: 'github Logo' },

];
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100% !important;
}
</style>

<template>
  <!-- ...::: Start Skill Display Section :::... -->
  <div class="skill-display-section section-gap-tb-165 section-bg pos-relative">
    <div class="skill-display-section-box">
      <div class="mx-auto px-3">
        <div class="grid xl:grid-cols-2 align-items-center">
          <div class="col-xl-6 col-xxl-5">
            <!-- Start Section Content -->
            <div class="section-content">
              <span class="section-tag" data-aos="fade-up">Special Skills</span>
              <h2 class="section-title" data-aos="fade-right">My Special Skill Field Here.</h2>

              <q-btn href="#" class="btn btn-xl btn-outline-one icon-space-left" data-aos="fade-up"
                >Get Resume <i class="icofont-download"></i
              ></q-btn>
            </div>
            <!-- End Section Content -->
          </div>

          <div class="flex justify-center ">
            <div class="offset-xxl-1 mt-5 grid sm:grid-cols-5 grid-cols-3 gap-2">
              <div  v-for="img in mySkills" :key="img.name" class="rounded-lg px-2 m-1.5" data-aos="fade-up">
            <img
             :src="'/images/tech-logos/' + img.src"
             :alt="img.alt.toUpperCase()"
             class=" px-3 py-3 size-[100px] object-cover object-center mx-auto "
           />
           <p class="capitalize text-caption text-center">{{ img.alt.split(' ')[0] }}</p>
           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="skill-display-shape"></div>
  </div>
  <!-- ...::: End Skill Display Section :::... -->
  <!-- ...::: Start Counter Display Section :::... -->
  <div class="counter-display-section section-gap-tb-165 section-bg-2">
  <div class="counter-display-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-center sm:justify-start">
        <!-- Column 1 -->
        <div class="block md:flex justify-start w-full sm:w-1/3 md:w-1/3">
          <div class="counterup-single-item">
            <div class="icon">
              <img
                src="/images/icon/counterup-icon-1.png"
                alt="Ebustech web design service number of happy client"
              />
            </div>
            <div class="content">
              <h2 class="number">
                <span class="counter" id="counter1">10</span>+
              </h2>
              <span class="text">Happy Clients</span>
            </div>
          </div>
        </div>
        <!-- Column 2 -->
        <div class="block md:flex justify-center w-full sm:w-1/3 md:w-1/3">
          <div class="counterup-single-item">
            <div class="icon">
              <img
                src="/images/icon/counterup-icon-2.png"
                alt="Ebustech web design service project completed"
              />
            </div>
            <div class="content">
              <div class="number">
                <span class="counter" id="counter2">100</span>
              </div>
              <span class="text">Project Complete</span>
            </div>
          </div>
        </div>
        <!-- Column 3 -->
        <div class="block md:flex justify-end w-full sm:w-1/3 md:w-1/3">
          <div class="counterup-single-item">
            <div class="icon">
              <img
                src="/images/icon/counterup-icon-3.png"
                alt="Ebustech web design service years of experience"
              />
            </div>
            <div class="content">
              <div class="number">
                <span class="counter" id="counter3">4</span>+
              </div>
              <span class="text">Years of Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <!-- ...::: End Counter Display Section :::... -->
</template>
