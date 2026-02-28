<script setup>
import { useRoute } from 'vue-router'
import Reader from '@/components/reader/Reader.vue'
import { computeAsset, useAsset } from '@/utils/hooks'
import { useCookies } from '@vueuse/integrations/useCookies'

const route = useRoute()

const title = route.params.title
const type = route?.query?.type ?? 'story'

const story = computeAsset(() => {
  if(type !== 'story' && type !== 'blog') 
    return import(`@/assets/codex/${type}/${title}.json`)
  else
    return import(`@/assets/${type}/${title}_pl.json`)
})

const cookies = useCookies()

const resolveChapter = () => {
  const routedChapter = route.params.chapter

  if(routedChapter)
    return Number(routedChapter)
  else
    return parseInt(cookies.get(`${story.value.title} chapter`) ?? '1')
}
</script>

<template>
  <main class="content bg-slate-50">
    <Reader v-if="story" :story="story" :chapter="resolveChapter()" />
  </main>
</template>
