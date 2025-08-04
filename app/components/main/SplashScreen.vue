<template>
  <div v-if="isLoading" class="splash-container">
    <div class="logo-wrapper">
      <h1 class="brand-name">
        <span
          v-for="(char, index) in fullTitle"
          :key="index"
          class="char"
          :style="{ animationDelay: `${index * 0.04}s` }"
        >
          {{ char }}
        </span>
      </h1>
      <p class="tagline">Boosting visibility. Driving results.</p>
    </div>
  </div>
</template>

<script setup>
const fullTitle = "RANK WITH EBUBE".split("");
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2500);
});
</script>

<style scoped>
.splash-container {
  position: fixed;
  inset: 0;
  background-color: #0f172a; /* Tailwind bg-slate-900 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  animation: fadeOut 0.5s ease-in-out forwards;
  animation-delay: 2.3s;
  pointer-events: none;
}

.logo-wrapper {
  text-align: center;
  padding: 0 1rem;
  width: 100%;
  max-width: 90vw;
}

.brand-name {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: 800;
  font-size: 2.5rem;
  color: white;
  line-height: 1.2;
  gap: 0.1em;
  word-break: break-word;
}

.char {
  opacity: 0;
  transform: translateY(15px);
  animation: appear 0.6s ease-out forwards;
}

.tagline {
  margin-top: 12px;
  font-size: 0.9rem;
  color: #cbd5e1;
  opacity: 0;
  animation: fadeInTagline 1s 1.5s forwards;
}

/* Animations */
@keyframes appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInTagline {
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .brand-name {
    font-size: 1.8rem;
    letter-spacing: 1px;
  }

  .tagline {
    font-size: 0.8rem;
  }
}
</style>
