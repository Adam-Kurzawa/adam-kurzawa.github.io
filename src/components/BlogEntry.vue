<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(['title'])

const router = useRouter()
const locale = useLocale()

const imageSrc = useAsset(import(`@/assets/blog/covers/${props.title}.jpg`))
const article = useAsset(import(`@/assets/blog/${props.title}_${locale.value}.json`))

const title = computed(() => article.value.title)
const description = computed(() => article.value.description)

const openReader = () => {
    router.push({ name: 'reader', params: { lang: locale.value, title: props.title }, query: { type: 'blog' } })
}
</script>

<template>
  <div class="entry" @click="openReader">
    <img :src="imageSrc" class="image" />
    <div v-if="article" class="title font-josefin">{{ title }}</div>
    <div v-if="article" class="stub font-segoe">{{ description }}</div>
  </div>
</template>

<style scoped>
.entry {
    transition: background 1s ease;
    border-radius: 0.5rem;
    max-width: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
}

.entry:hover {
    background-color: #e69b54;
}

.image {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    height: 200px;
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
    text-align: justify;
    font-size: 0.85rem;
}

.entry:hover .stub {
  color: white;
}
</style>
