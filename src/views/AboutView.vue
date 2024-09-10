<script setup>
import { useRoute } from 'vue-router';
import PersonalInfo from "@/components/PersonalInfo.vue";
import { useLocale, useTranslation } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang
</script>

<template>
  <main class="generic-view">
    <h1>{{ t("navbar.about") }}</h1>
    <PersonalInfo />
  </main>
</template>
