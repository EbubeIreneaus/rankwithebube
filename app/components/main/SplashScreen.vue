<template>
  <div class="splash-screen loader bg-primary" v-if="isLoading">
    <h1 class="text-container">
      <span v-for="(char, index) in title" :key="index" class="letter">
        {{ char }}
      </span>
    </h1>
  </div>
</template>

<script setup>
const title = "RWE".split("");
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});
</script>

<style scoped>
/* Fullscreen Splash */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999999999;
  opacity: 1;
  transition: all 0.3s linear;
}

/* Text Container */
.text-container {
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 10px;
  color: white;
  display: flex;
  gap: 5px;
  overflow: hidden;
}

/* Letters */
.letter {
  display: inline-block;
  position: relative;
  opacity: 0;
  animation: fadeIn 1s forwards, flashEffect 2s infinite linear;
}

/* Flash Animation */
@keyframes flashEffect {
  0% {
    background: linear-gradient(
      90deg,
      transparent 0%,
      white 50%,
      transparent 100%
    );
    background-size: 300% 100%;
    background-position: 100% 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  100% {
    background-position: -100% 0;
  }
}

/* Staggered Letter Animation */
.letter:nth-child(1) {
  animation-delay: 0.1s;
}
.letter:nth-child(2) {
  animation-delay: 0.2s;
}
.letter:nth-child(3) {
  animation-delay: 0.3s;
}

/* Fade Out Effect */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
