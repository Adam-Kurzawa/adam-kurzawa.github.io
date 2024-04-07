<script setup>
import { useRoute } from 'vue-router';
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang
</script>

<template>
  <main>
    Test
  </main>
</template>
