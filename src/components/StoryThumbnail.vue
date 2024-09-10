<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["title", "type"]);

const router = useRouter();
const locale = useLocale();

const imageSrc = props.type === 'story' ? 
    useAsset(import(`@/assets/story/covers/${props.title}.jpg`)) : 
    useAsset(import(`@/assets/blog/covers/${props.title}.jpg`));

const content = props.type === 'story' ? 
    useAsset(import(`@/assets/story/${props.title}_${locale.value}.json`)) : 
    useAsset(import(`@/assets/blog/${props.title}_${locale.value}.json`));

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)

const openReader = () => {
  router.push({
    name: "reader",
    params: { lang: locale.value, title: props.title },
    query: { type: props.type }
  });
};
</script>

<template>
  <div class="entry" :class="`entry-for-${props.type}`" @click="openReader">
    <img :src="imageSrc" :class="`image-for-${props.type}`" />
    <div v-if="content" class="info">
      <div class="title font-josefin">{{ title }}</div>
      <div class="description font-segoe">{{ description }}</div>
    </div>
  </div>
</template>

<style scoped>
.entry {
  transition: background 1s ease;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  box-shadow: 0 0 2rem gainsboro;
}

.entry-for-blog {
  max-width: 400px;
}

.entry-for-story {
  width: 350px;
  max-width: 350px;
  height: 700px;
}

.entry:hover {
  background-color: darkgoldenrod;
}

.image-for-blog {
  height: 200px;
}

.image-for-story {
  width: 350px;
  height: 420px;
}

.info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  transition: color 0.5s ease;
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  color: black;
}

.entry:hover .title {
  color: white;
}

.description {
  transition: color 0.5s ease;
  text-align: justify;
  color: darkslategrey;
  font-size: 0.9rem;
}

.entry:hover .description {
  color: white;
}

@media screen and (max-width: 640px) {
  .entry {
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    max-width: none;
    height: auto;
    width: auto;
  }

  .image {
    width: 100%;
    height: auto;
  }
}
</style>
