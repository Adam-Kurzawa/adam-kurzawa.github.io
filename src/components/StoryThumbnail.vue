<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(['title'])

const router = useRouter()
const locale = useLocale()

const imageSrc = useAsset(import(`@/assets/stories/covers/${props.title}.jpg`))
const story = useAsset(import(`@/assets/stories/${props.title}_${locale.value}.json`))

const title = computed(() => story.value.title)
const description = computed(() => story.value.description)

const openReader = () => {
  router.push({ name: 'reader', params: { lang: locale.value, title: props.title } })
}
</script>

<template>
  <div class="entry" @click="openReader">
    <img :src="imageSrc" class="image" />
    <div v-if="story" class="description">
      <div class="title font-josefin">{{ title }}</div>
      <div class="stub font-segoe">{{ description }}</div>
    </div>
  </div>
</template>

<style scoped>
.entry {
    transition: background 1s ease;
    border-radius: 0.5rem;
    width: 600px;
    max-width: 600px;
    height: 300px;
    background-color: white;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    cursor: pointer;
}

.entry:hover {
    background-color: #e69b54;
}

.image {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    width: 250px;
    height: 300px;
}

.description {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
}

.title {
    transition: color 0.5s ease;
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    color: #e69b54;
    text-align: center;
    text-transform: uppercase;
}

.entry:hover .title {
  color: white;
}

.stub {
    transition: color 0.5s ease;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    text-align: justify;
    font-size: 0.85rem;
}

.entry:hover .stub {
  color: white;
}

@media screen and (max-width: 640px) {
  .entry {
    border-radius: 0;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    max-width: none;
    height: auto;
    width: auto;
    padding-top: 1rem;
  }

  .image {
    border-radius: 0.5rem;
  }

  .stub {
    padding-bottom: 0;
  }
}
</style>
