<script setup>
import { useRoute } from 'vue-router'
import { useLocale, useTranslation } from '@/utils/hooks'
import WorkInProgress from '@/components/WorkInProgress.vue'
import H0 from '@/components/H0.vue'

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <H0 :text="t('navbar.books')" />
    <WorkInProgress />
  </main>
</template>
