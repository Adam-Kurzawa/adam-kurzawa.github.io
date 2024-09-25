<script setup>
import { useRoute } from 'vue-router'
import { useLocale, useTranslation } from '@/utils/hooks'
import WorkInProgress from '@/components/WorkInProgress.vue'
import H1 from '@/components/H1.vue'

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <H1 :text="t('navbar.books')" colorful="true" />
    <WorkInProgress />
  </main>
</template>
