<script setup>
import { useRoute } from 'vue-router';
import StoryThumbnail from "@/components/StoryThumbnail.vue";
import { ref } from 'vue';
import { useLocale } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang

const stories = ref(
  new Set(
    Object.keys(import.meta.glob('@/assets/stories/*.json'))
      .map(s => s.substring(20).slice(0, -8))
  )
)
</script>

<template>
  <main class="entries">
    <StoryThumbnail v-for="story in stories" :title="story"/>
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