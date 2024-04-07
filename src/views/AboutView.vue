<script setup>
import { useRoute } from 'vue-router';
import PersonalInfo from "@/components/PersonalInfo.vue";
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang
</script>

<template>
  <main>
    <PersonalInfo />
  </main>
</template>
