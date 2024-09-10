<script setup>
import { useAsset, useLocale } from "@/utils/hooks";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["title"]);

const router = useRouter();
const locale = useLocale();

const imageSrc = useAsset(import(`@/assets/stories/covers/${props.title}.jpg`));
const story = useAsset(
  import(`@/assets/stories/${props.title}_${locale.value}.json`)
);

const title = computed(() => story.value.title);
const description = computed(() => story.value.description);

const openReader = () => {
  router.push({
    name: "reader",
    params: { lang: locale.value, title: props.title },
  });
};
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
  width: 350px;
  max-width: 350px;
  height: 700px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
}

.entry:hover {
  background-color: #e69b54;
}

.image {
  width: 350px;
  height: 420px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.description {
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
  color: #e69b54;
}

.entry:hover .title {
  color: white;
}

.stub {
  transition: color 0.5s ease;
  text-align: justify;
  font-size: 0.9rem;
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
  }

  .image {
    border-radius: 0;
    width: 100%;
    height: auto;
  }
}
</style>
