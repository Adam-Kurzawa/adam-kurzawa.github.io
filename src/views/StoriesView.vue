<script setup>
import { useRoute } from 'vue-router'
import StoryThumbnail from '@/components/StoryThumbnail.vue'
import H0 from '@/components/headers/H0.vue'
import { ref } from 'vue'
import { useLocale, useTranslation } from '@/utils/hooks'

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
    <H0 :text="t('navbar.stories')" />
    <div class="entries">
      <StoryThumbnail v-for="story in stories" :title="story" type="story" />
    </div>
  </main>
</template>

<style scoped>
.zi {
  z-index: 100;
}
.line {
  width: 100%;
  border-bottom: 1px solid #b8860b;
  position: absolute;
  opacity: 0.15;
}
.ggg {
  width: 10rem;
  opacity: 0.15;
  position: absolute;
  filter: invert(48%) sepia(85%) saturate(490%) hue-rotate(5deg) brightness(93%) contrast(91%);
}
.fooo {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 4rem;
}
.entries {
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 6rem;
  gap: 8rem;
} 

@media screen and (max-width: 1024px) {
  .entries {
    margin-top: 2rem;
  }
}
</style>