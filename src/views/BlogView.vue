<script setup>
import { useRoute } from 'vue-router';
import BlogEntry from "@/components/BlogEntry.vue";
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang
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
