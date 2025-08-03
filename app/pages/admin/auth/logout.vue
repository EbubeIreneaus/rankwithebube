<template>
  <div class="min-h-screen">
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false
})
const router = useRouter()
const cookie = useCookie('Authorization')
cookie.value = null

router.push('/admin/auth')
</script>

<style>

</style>