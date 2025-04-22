<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { countCharacters } from '@/utils/functions'
import { useThemeStore } from '@/stores/theme'
import { theme } from 'ant-design-vue'

const props = defineProps([ 'story', 'chapter', 'fontSize', 'fontFamily' ])

const { useToken } = theme
const { token } = useToken()

const router = useRouter()
const route = useRoute()
const t = useTranslation()
const themeStore = useThemeStore()

const paragraphs = computed(() => props.story.chapters[props.chapter - 1])
const charactersCount = computed(() => countCharacters(props.story.chapters))

const previousPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.max(1, props.chapter - 1) } })
const previousPageEnabled = computed(() => props.chapter !== 1)

const nextPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.min(props.story.chapters.length, props.chapter + 1) } })
const nextPageDisabled = computed(() => props.chapter === props.story.chapters.length)
const nextPageEnabled = computed(() => props.chapter !== props.story.chapters.length)

const hasMultiplePages = computed(() => previousPageEnabled.value || nextPageEnabled.value)

const isHoveredPreviousChapter = ref(false)
const onHoverPreviousChapter = () => { isHoveredPreviousChapter.value = true }
const onUnhoverPreviousChapter = () => { isHoveredPreviousChapter.value = false }

const isHoveredNextChapter = ref(false)
const onHoverNextChapter = () => { isHoveredNextChapter.value = true }
const onUnhoverNextChapter = () => { isHoveredNextChapter.value = false }
</script>

<template>
  <div class="white-panel" :style="{ borderColor: token.colorBorderSecondary }">
    <a-typography-text type="secondary" class="stats">{{ charactersCount }} {{ t("reader.signs") }} | &copy; {{ props.story.year }}</a-typography-text>
    <a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="title">{{ props.story.title }}</a-typography-title>
    <div class="chapter-pager" v-if="hasMultiplePages">
      <div class="prev-chapter" v-if="previousPageEnabled" :class="[themeStore.secondaryTextColor, isHoveredPreviousChapter ? themeStore.primaryLinkColor : '']">
        <div class="arrow">←</div>
        <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter - 2] ? 'gapped' : '']" @mouseenter="onHoverPreviousChapter" @mouseleave="onUnhoverPreviousChapter" @click="previousPage">
          <div class="prev-scene">{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}</div>
          <div v-if="story.chapterTitles" class="prev-chapterTitle">{{ props.story.chapterTitles[props.chapter - 2] }}</div>
        </div>
      </div>
      <div v-else></div>
      <div class="scene-and-title" :class="[themeStore.primaryTextColor, story.chapterTitles ? 'gapped' : '']">
        <div class="scene">{{ t("reader.epub-chapter") }} {{ props.chapter }}</div>
        <div v-if="story.chapterTitles" class="chapterTitle">{{ props.story.chapterTitles[props.chapter - 1] }}</div>
      </div>
      <div class="next-chapter" v-if="nextPageEnabled" :class="[themeStore.secondaryTextColor, isHoveredNextChapter ? themeStore.primaryLinkColor : '']">
        <div class="arrow">→</div>
        <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter] ? 'gapped' : '']" @mouseenter="onHoverNextChapter" @mouseleave="onUnhoverNextChapter" @click="nextPage">
          <div class="next-scene">{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}</div>
          <div v-if="story.chapterTitles" class="next-chapterTitle">{{ props.story.chapterTitles[props.chapter] }}</div>
        </div>
      </div>
      <div v-else></div>
    </div>
    <div v-for="(paragraph, index) in paragraphs" class="paragraph" :class="[ themeStore.primaryTextColor, index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
      {{ paragraph }}
    </div>
    <div v-if="nextPageDisabled" class="title" :class="themeStore.primaryTextColor">{{ t("reader.theEnd") }}</div>
    <div class="bottom-chapter-pager" v-if="hasMultiplePages">
      <div class="prev-chapter" v-if="previousPageEnabled" :class="[themeStore.secondaryTextColor, isHoveredPreviousChapter ? themeStore.primaryLinkColor : '']">
        <div class="arrow">←</div>
        <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter - 2] ? 'gapped' : '']" @mouseenter="onHoverPreviousChapter" @mouseleave="onUnhoverPreviousChapter" @click="previousPage">
          <div class="prev-scene">{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}</div>
          <div v-if="story.chapterTitles" class="prev-chapterTitle">{{ props.story.chapterTitles[props.chapter - 2] }}</div>
        </div>
      </div>
      <div class="next-chapter" v-if="nextPageEnabled" :class="[themeStore.secondaryTextColor, isHoveredNextChapter ? themeStore.primaryLinkColor : '']">
        <div class="arrow">→</div>
        <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter] ? 'gapped' : '']" @mouseenter="onHoverNextChapter" @mouseleave="onUnhoverNextChapter" @click="nextPage">
          <div class="next-scene">{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}</div>
          <div v-if="story.chapterTitles" class="next-chapterTitle">{{ props.story.chapterTitles[props.chapter] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.white-panel {
  transition: padding 0.5s ease, background 0.5s ease;
  margin-bottom: 4rem;
  margin-left: 15%;
  margin-right: 15%;
  padding-left: 6rem;
  padding-right: 6rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.arrow {
  font-size: 1.25rem;
  transition: color 0.5s ease;
}

.navigable {
  cursor: pointer;
}

.gapped {
  gap: 0.5rem;
}

.scene-and-title {
  display: flex;
  flex-direction: column;
}

.bottom-chapter-pager {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: minmax(0, 50%) minmax(0, 50%);
}

.chapter-pager {
  display: grid;
  grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
  margin-bottom: 1.5rem;
}

.prev-chapter {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.next-chapter {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  align-items: center;
}

.page-buttons {
  margin-top: 2rem;
  display: grid !important;
  grid-template-columns: 50% 50% !important;
  width: 100% !important;
}

.title {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 2rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.stats {
  display: block;
  width: 100%;
  text-align: center;
}

.next-scene {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 1rem;
  text-align: right;
}

.prev-scene {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 1rem;
}

.scene {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  text-align: center;
  font-size: 1.25rem;
}

.next-chapterTitle {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 1rem;
  text-align: right;
}

.prev-chapterTitle {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 1rem;
}

.chapterTitle {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  text-align: center;
  font-size: 1.25rem;
}

.indented {
  text-indent: 2rem;
}

.paragraph {
  transition: color 1s ease, font-size 1s ease;
  text-align: justify;
  margin-top: 0.5rem;
}

@media screen and (max-width: 1600px) {
  .white-panel {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}

@media screen and (max-width: 1280px) {
  .white-panel {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media screen and (max-width: 1024px) {
  .white-panel {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
