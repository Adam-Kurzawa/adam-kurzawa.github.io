<script setup>
import { useThemeStore } from '@/stores/theme'
import { useAsset, useLocale } from '@/utils/hooks'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TextButton from './buttons/TextButton.vue'
import H1 from './headers/H1.vue'
import SecondaryText from './texts/SecondaryText.vue'
import { countCharacters } from '@/utils/functions'
import IconButton from './buttons/IconButton.vue'

const props = defineProps([ 'title' ]);

const router = useRouter()
const locale = useLocale()
const themeStore = useThemeStore()

const imageSrc = useAsset(import(`@/assets/story/covers/${props.title}.jpg`));
const content = useAsset(import(`@/assets/story/${props.title}_${locale.value}.json`));

const title = computed(() => content.value.title);
const description = computed(() => content.value.description);
const year = computed(() => content.value.year);
const chapters = computed(() => content.value.chapters.length);
const tags = computed(() => [ '#sci-fi', '#space-opera', '#military', '#action' ]);
const charactersCount = computed(() => countCharacters(content.value.chapters))

const isMouseHovered = ref(false)
const onMouseHover = () => { isMouseHovered.value = true }
const onMouseLeave = () => { isMouseHovered.value = false }

const openReader = () => {
  router.push({
    name: 'reader',
    params: { lang: locale.value, title: props.title },
    query: { type: 'story' },
  });
};
</script>

<template>
  <div class="story-thumbnail" v-if="content" @mouseenter="onMouseHover" @mouseleave="onMouseLeave">
    <div class="story-thumbnail-header">
      <H1 :text="title" v-if="!isMouseHovered" />
      <H1 :text="title" colorful="true" v-if="isMouseHovered" />
      <div class="story-thumbnail-tags">
        <span class="story-thumbnail-tag font-segoe" :class="themeStore.secondaryTextColor" v-for="tag in tags">{{ tag }}</span>
      </div>
    </div>
    <img class="story-thumbnail-cover" :class="themeStore.shadowColor" :src="imageSrc" />
    <div class="story-thumbnail-bottom" :class="[ isMouseHovered ? themeStore.onHoverBackgroundColor : themeStore.secondaryBackgroundColor ]">
      <div class="story-thumbnail-bottom-bottom">
        <TextButton text="Przeczytaj" :action="openReader" />
        <div class="story-thumbnail-tuple">
          <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Opis</div>
          <SecondaryText class="story-thumbnail-description" :text="description" />
        </div>
      </div>
      <div class="story-thumbnail-bottom-bottom-right">
        <div class="story-thumbnail-tuple">
          <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Rok wydania</div>
          <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ year }}</div>
        </div>
        <div class="story-thumbnail-tuple">
          <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Długość</div>
          <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ charactersCount }} znaków</div>
          <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ chapters }} rozdziałów</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.story-thumbnail {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-cover {
  position: absolute;
  width: 14rem;
  top: -1rem;
  left: 4rem;
  height: auto;
}

.story-thumbnail-label {
  font-weight: bold;
  white-space: nowrap;
}

.story-thumbnail-value {
  white-space: nowrap;
}

.story-thumbnail-description {
  text-align: justify;
}

.story-thumbnail-fragment {
  font-style: italic;
  text-indent: 2rem;
  white-space: pre-wrap;
}

.story-thumbnail-tuple {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.story-thumbnail-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.story-thumbnail-icon-button-icon {
  width: 1rem;
  height: auto;
  filter: invert(28%) sepia(8%) saturate(1633%) hue-rotate(131deg) brightness(93%) contrast(92%);
}

.story-thumbnail-icon-button-label {
  font-size: 1rem;
}

.story-thumbnail-icon-button {
  background-color: transparent;
  border-radius: 0.5rem;
  border: 1px solid darkslategray;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
}

.story-thumbnail-icon-button:hover {
  color: darkgoldenrod;
  border-color: darkgoldenrod;
}

.story-thumbnail-icon-button:hover .story-thumbnail-icon-button-icon {
  filter: invert(47%) sepia(100%) saturate(411%) hue-rotate(5deg) brightness(94%) contrast(94%);
}

.story-thumbnail-tag {
  cursor: pointer;
}

.story-thumbnail-tag:hover {
  color: darkgoldenrod;
}

.story-thumbnail-button {
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: fit-content;
  color: white;
  background-color: darkslategray;
  font-weight: lighter;
  cursor: pointer;
}

.story-thumbnail-button:hover {
  background-color: darkgoldenrod;
}

.story-thumbnail-bottom {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  padding-left: 22rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
  transition: background 0.5s ease;
  min-height: 12rem;
}

.story-thumbnail-bottom-up-right {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.story-thumbnail-bottom-bottom {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-bottom-bottom-right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-header {
  padding-left: 22rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media screen and (max-width: 1280px) {
  .story-thumbnail-cover {
    left: 2rem;
  }

  .story-thumbnail-header {
    padding-left: 20rem;
  }

  .story-thumbnail-bottom {
    gap: 3rem;
    padding-right: 3rem;
    padding-left: 20rem;
  }
}

@media screen and (max-width: 1024px) {
  .story-thumbnail-header {
    padding-left: 19rem;
  }

  .story-thumbnail-bottom {
    border-radius: 0;
    padding-left: 19rem;
  }
}
</style>
