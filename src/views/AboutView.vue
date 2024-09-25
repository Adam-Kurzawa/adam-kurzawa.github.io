<script setup>
import { useRoute } from 'vue-router'
import H1 from '@/components/H1.vue'
import WorkInProgress from '@/components/WorkInProgress.vue'
import { useLocale, useTranslation } from '@/utils/hooks'

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <H1 :text="t('navbar.about')" colorful="true" />
    <WorkInProgress />
  </main>
</template>
