<script setup>
import { useRoute } from 'vue-router'
import { useLocale } from '@/utils/hooks'
import AboutMe from '@/components/AboutMe.vue'

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <AboutMe />
  </main>
</template>
