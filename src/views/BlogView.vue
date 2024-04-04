<script setup>
import { useRoute } from 'vue-router';
import BlogEntry from "@/components/BlogEntry.vue";
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

const language = route.params.lang

locale.value = language
</script>

<template>
  <main class="entries">
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
    <BlogEntry />
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
