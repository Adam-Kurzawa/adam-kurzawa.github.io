<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router';
import BlogEntry from "@/components/BlogEntry.vue";
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang

const articles = ref(
  new Set(
    Object.keys(import.meta.glob('@/assets/blog/*.json'))
      .map(s => s.substring(17).slice(0, -8))
  )
)
</script>

<template>
  <main class="entries">
    <BlogEntry v-for="article in articles" :title="article"/>
  </main>
</template>

<style scoped>
.entries {
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
