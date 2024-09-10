<script setup>
import { useRoute } from 'vue-router';
import StoryThumbnail from "@/components/StoryThumbnail.vue";
import { ref } from 'vue';
import { useLocale, useTranslation } from '@/utils/hooks';

const locale = useLocale()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang

const stories = ref(
  new Set(
    Object.keys(import.meta.glob('@/assets/story/*.json'))
      .map(s => s.substring(18).slice(0, -8))
  )
)
</script>

<template>
  <main class="generic-view">
    <h1>{{ t("navbar.stories") }}</h1>
    <div class="entries">
      <StoryThumbnail v-for="story in stories" :title="story" type="story" />
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