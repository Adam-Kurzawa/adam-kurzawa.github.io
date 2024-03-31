<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Reader from "@/components/Reader.vue";

const route = useRoute()
const language = route.params.lang
const title = route.params.title
const chapter = route.params.chapter ? Number(route.params.chapter) : 1
const story = ref()

import(`@/assets/stories/${title}_${language}.json`)
  .then(module => story.value = module.default)
</script>

<template>
  <main>
    <Reader v-if="story" :story="story" :chapter="chapter" />
  </main>
</template>
