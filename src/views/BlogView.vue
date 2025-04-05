<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale, useTranslation } from '@/utils/hooks'
import BlogCard from '@/components/BlogCard.vue'

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang

const articles = ref(
  new Set(
    Object.keys(import.meta.glob('@/assets/blog/*.json'))
      .map(s => s.substring(17).slice(0, -8))
  )
)

const entries = computed(() => [...articles.value])
const firstEntry = computed(() => entries.value[0])
const secondEntry = computed(() => entries.value[1])
const thirdEntry = computed(() => entries.value[2])
const otherEntries = computed(() => entries.value.slice(3))
</script>

<template>
  <main class="generic-view">
    <a-typography-title class="h3" :level="3">Najnowsze wpisy</a-typography-title>
    <div class="spotlight">
      <BlogCard :title="firstEntry" variant="vertical"/>
      <div class="spotlight-right">
        <BlogCard :title="secondEntry" variant="vertical"/>
        <BlogCard :title="thirdEntry" variant="vertical"/>
      </div>
    </div>
    <a-typography-title class="h3" :level="3">Wszystkie wpisy</a-typography-title>
    <div class="entries">
      <BlogCard v-for="article in otherEntries" :title="article" variant="vertical"/>
    </div>
  </main>
</template>

<style scoped>
.h3 {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.75rem;
}

.entries {
  display: grid;
  grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
  gap: 2rem;
}

.spotlight {
  display: grid;
  grid-template-columns: minmax(0, 70%) minmax(0, 30%);
  gap: 2rem;
}

.spotlight-right {
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;
}

.mt-1 {
  margin-top: 1rem;
}

@media screen and (max-width: 1024px) {
  .entries {
    margin-top: 2rem;
  }
}
</style>
