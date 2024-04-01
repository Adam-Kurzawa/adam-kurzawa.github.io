<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()

const language = route.params.lang

locale.value = language
</script>

<template>
  <main>
    Test
  </main>
</template>
