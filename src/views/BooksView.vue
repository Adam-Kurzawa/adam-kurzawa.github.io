<script setup>
import { useRoute } from 'vue-router';
import { useLocale, useTranslation } from '@/utils/hooks';
import WorkInProgress from '@/components/WorkInProgress.vue';

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <h1>{{ t("navbar.books") }}</h1>
    <WorkInProgress />
  </main>
</template>
