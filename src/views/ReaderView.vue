<script setup>
import { useRoute } from 'vue-router'
import Reader from '@/components/reader/Reader.vue'
import { useAsset, useLocale } from '@/utils/hooks'

const locale = useLocale()
const route = useRoute()

const language = route.params.lang
const title = route.params.title
const type = route?.query?.type ?? 'story'

const story = useAsset(import(`@/assets/${type}/${title}_${language}.json`))

const resolveChapter = () => {
  const routedChapter = route.params.chapter

  if(routedChapter)
    return Number(routedChapter)
  else
    return parseInt($cookies.get(`${story.value.title} chapter`) ?? '1')
}

locale.value = language
</script>

<template>
  <main>
    <Reader v-if="story" :story="story" :chapter="resolveChapter()" />
  </main>
</template>
