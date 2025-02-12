<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useLocale } from '@/utils/hooks'
import StoryCard from '@/components/StoryCard.vue'

const locale = useLocale()
const route = useRoute()

locale.value = route.params.lang

const seriesQuery = route.query.series

const stories = ref(
  new Set(
    Object.keys(import.meta.glob('@/assets/story/*.json'))
      .map(s => s.substring(18).slice(0, -8))
  )
)
</script>

<template>
  <main class="generic-view entries">
    <StoryCard v-for="story in stories" :title="story" :series-filter="seriesQuery" />
  </main>
</template>

<style scoped>
.entries {
  justify-content: center;
} 
</style>