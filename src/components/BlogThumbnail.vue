<script setup>
import { useAsset, useLocale } from '@/utils/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import H2 from './headers/H2.vue'
import SecondaryText from './texts/SecondaryText.vue';
import { useThemeStore } from '@/stores/theme';

const props = defineProps([ 'title', 'variant' ]) // variant == vertical | horizontal

const router = useRouter()
const locale = useLocale()
const themeStore = useThemeStore()

const imageSrc = useAsset(import(`@/assets/blog/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/blog/${props.title}_${locale.value}.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const publicationDate = computed(() => content.value.publicationDate)

const openReader = () => {
  router.push({
    name: "reader",
    params: { lang: locale.value, title: props.title },
    query: { type: props.type }
  });
};
</script>

<template>
  <div v-if="content" :class="[`entry-${props.variant}`, themeStore.secondaryBackgroundColor]" @click="openReader">
    <img class="image" :src="imageSrc" />
    <div class="texts">
      <div class="font-segoe" :class="themeStore.primaryTextColor">{{ publicationDate }}</div>
      <H2 :text="title" />
      <SecondaryText :text="description" />
    </div>
  </div>
</template>

<style scoped>
.entry-vertical {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;
}

.entry-horizontal {
  padding: 1rem;
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 1rem;
  border-radius: 0.5rem;
}

.image {
  border-radius: 0.5rem;
  max-width: 100%;
}

.texts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
