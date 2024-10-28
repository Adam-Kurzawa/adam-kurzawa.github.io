<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale, useTranslation } from '@/utils/hooks'
import BlogThumbnail from '@/components/BlogThumbnail.vue'
import H0 from '@/components/headers/H0.vue'
import H2 from '@/components/headers/H2.vue'

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

const firstEntry = computed(() => [...articles.value][0])
</script>

<template>
  <main class="generic-view">
    <H0 :text="t('navbar.blog')" />
    <H2 class="mt-1" text="Najnowsze wpisy" />
    <div class="spotlight">
      <BlogThumbnail :title="firstEntry" variant="vertical"/>
      <div class="spotlight-right">
        <BlogThumbnail :title="firstEntry" variant="horizontal"/>
        <BlogThumbnail :title="firstEntry" variant="horizontal"/>
        <BlogThumbnail :title="firstEntry" variant="horizontal"/>
      </div>
    </div>
    <H2 class="mt-1" text="Wszystkie wpisy" />
    <div class="entries">
      <BlogThumbnail v-for="article in articles" :title="article" variant="vertical"/>
      <BlogThumbnail v-for="article in articles" :title="article" variant="vertical"/>
    </div>
  </main>
</template>

<style scoped>
.entries {
  display: grid;
  grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
  gap: 2rem;
}

.spotlight {
  display: grid;
  grid-template-columns: minmax(0, 50%) minmax(0, 50%);
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
