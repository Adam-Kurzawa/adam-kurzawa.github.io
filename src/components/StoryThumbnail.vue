<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed, ref } from "vue";

const props = defineProps(['title'])

const locale = useLocale()
const imageSrc = useAsset(import(`@/assets/stories/covers/${props.title}.jpg`))
const story = useAsset(import(`@/assets/stories/${props.title}_${locale.value}.json`))
const title = computed(() => story.value.title)
</script>

<template>
  <div class="entry">
    <img :src="imageSrc" class="image" />
    <div v-if="story" class="description">
      <div class="title font-josefin">{{ title }}</div>
      <div class="stub font-segoe">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        fermentum nunc nulla, ac fermentum purus interdum vel. Donec at leo
        aliquam diam viverra vestibulum. Aenean iaculis sem sed mauris tincidunt,
        nec euismod nunc malesuada. Mauris ac egestas massa, at auctor orci.
        Nullam ante turpis, luctus quis aliquam a, vehicula vitae diam.
        Pellentesque malesuada gravida libero vitae egestas. Nam nec nisi viverra,
        tincidunt urna vel, faucibus lorem.
      </div>
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
</style>
