<script setup>
import { useRoute } from 'vue-router';
import Reader from "@/components/Reader.vue";
import { useAsset, useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

const language = route.params.lang
const title = route.params.title
const chapter = route.params.chapter ? Number(route.params.chapter) : 1
const type = route?.query?.type ?? 'stories'

const story = useAsset(import(`@/assets/${type}/${title}_${language}.json`))

locale.value = language
</script>

<template>
  <main>
    <Reader v-if="story" :story="story" :chapter="chapter" />
  </main>
</template>
