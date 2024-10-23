<script setup>
import { useRoute } from 'vue-router'
import H0 from '@/components/H0.vue'
import WorkInProgress from '@/components/WorkInProgress.vue'
import { useLocale, useTranslation } from '@/utils/hooks'

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <H0 :text="t('navbar.about')" colorful="true" />
    <WorkInProgress />
  </main>
</template>
