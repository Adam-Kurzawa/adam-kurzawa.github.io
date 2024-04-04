<script setup>
import { useRoute } from 'vue-router';
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

const language = route.params.lang

locale.value = language
</script>

<template>
  <main>
    Test
  </main>
</template>
