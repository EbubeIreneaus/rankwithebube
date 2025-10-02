<template>
  <u-app>
    <nuxt-layout>
      <NuxtLoadingIndicator />
      <nuxt-page />
    </nuxt-layout>
    <MainSplashScreen />
  </u-app>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest',
    },
  ],
  script: [
    {
      type: 'text/javascript',
      id: 'tawk-script',
      innerHTML: `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/66d30eee50c10f7a00a2745e/1i6k74m9e';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `
    }
  ],

});

</script>
