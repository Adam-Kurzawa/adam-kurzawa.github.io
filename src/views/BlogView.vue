<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router';
import { useLocale, useTranslation } from '@/utils/hooks';
import BlogThumbnail from "@/components/BlogThumbnail.vue";

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
</script>

<template>
  <main class="generic-view">
    <h1>{{ t("navbar.blog") }}</h1>
    <div class="entries">
      <BlogThumbnail v-for="article in articles" :title="article" type="blog"/>
    </div>
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

@media screen and (max-width: 1024px) {
  .entries {
    margin-top: 2rem;
  }
}
</style>
