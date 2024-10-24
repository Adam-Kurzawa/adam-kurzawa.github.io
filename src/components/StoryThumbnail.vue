<script setup>
import { useThemeStore } from '@/stores/theme'
import { useAsset, useLocale } from '@/utils/hooks'
import { computed } from 'vue'
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
const genre = computed(() => 'sci-fi');
const tags = computed(() => [ '#sci-fi', '#space-opera', '#military', '#action' ]);
const charactersCount = computed(() => countCharacters(content.value.chapters))

const fragment = computed(() => {
  const firstChapter = content.value.chapters[0]
  let result = ''
  let line = 0
  
  do {
    result += firstChapter[line]
    result += '\n\t'
    line += 1
  } while (result.length < 300);

  return result
});

const openReader = () => {
  router.push({
    name: 'reader',
    params: { lang: locale.value, title: props.title },
    query: { type: 'story' },
  });
};
</script>

<template>
  <div class="story-thumbnail" v-if="content">
    <H1 class="story-thumbnail-title" :text="title" />
    <img class="story-thumbnail-cover" :class="themeStore.shadowColor" :src="imageSrc" />
    <div class="story-thumbnail-bottom" :class="themeStore.secondaryBackgroundColor">
      <div class="story-thumbnail-bottom-up">
        <TextButton text="Przeczytaj" :action="openReader" />
        <div class="story-thumbnail-bottom-up-right">
          <IconButton text="Pobierz ePUB" image="download.svg" />
          <IconButton text="Pobierz mobi" image="download.svg" />
          <IconButton text="Wyślij do Kindle" image="send.svg" />
          <IconButton text="Udostępnij" image="share.svg" />
        </div>
      </div>
      <div class="story-thumbnail-bottom-bottom">
        <div class="story-thumbnail-bottom-bottom-left">
          <div class="story-thumbnail-tuple story-thumbnail-bottom-bottom-left-description">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Opis</div>
            <SecondaryText class="story-thumbnail-description" :text="description" />
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Fragment</div>
            <SecondaryText class="story-thumbnail-description story-thumbnail-fragment" :text="fragment" />
          </div>
        </div>
        <div class="story-thumbnail-bottom-bottom-right">
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Rok wydania</div>
            <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ year }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Długość</div>
            <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ charactersCount }} znaków, {{ chapters }} rozdziałów</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Gatunek</div>
            <div class="story-thumbnail-value font-segoe" :class="themeStore.secondaryTextColor">{{ genre }}</div>
          </div>
          <div class="story-thumbnail-tuple">
            <div class="story-thumbnail-label font-josefin" :class="themeStore.secondaryTextColor">Tagi</div>
            <div class="story-thumbnail-tags">
              <span class="story-thumbnail-tag font-segoe" :class="themeStore.secondaryTextColor" v-for="tag in tags">{{ tag }}</span>
            </div>
          </div>
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
  top: -4rem;
  left: 4rem;
  height: auto;
}

.story-thumbnail-label {
  font-weight: bold;
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

.story-thumbnail-bottom-bottom-left-description {
  padding-left: 18rem;
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
  flex-direction: column;
  gap: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
}

.story-thumbnail-bottom-up {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  margin-left: 18rem;
}

.story-thumbnail-bottom-up-right {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.story-thumbnail-bottom-bottom {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 4rem;
}

.story-thumbnail-bottom-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-bottom-bottom-right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-thumbnail-title {
  padding-left: 22rem;
}
</style>
