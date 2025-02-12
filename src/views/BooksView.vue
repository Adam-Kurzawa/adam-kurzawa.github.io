<script setup>
import { useRoute } from 'vue-router'
import { useLocale } from '@/utils/hooks'
import WorkInProgress from '@/components/WorkInProgress.vue'

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <WorkInProgress />
  </main>
</template>
