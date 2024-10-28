<script setup>
import { computed, ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { countCharacters } from '@/utils/functions'
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'story', 'chapter' ])

const router = useRouter()
const route = useRoute()
const t = useTranslation()
const themeStore = useThemeStore()

const fontSize = ref($cookies.get('font-size') ?? 1.25)
const fontFamily = ref($cookies.get('font-family') ?? 'Times New Roman')

const paragraphs = computed(() => props.story.chapters[props.chapter - 1])
const charactersCount = computed(() => countCharacters(props.story.chapters))

const semitransparentBgClass = computed(() => `${themeStore.currentTheme}-mode-semitransparent-bg`)

const setFontSize = (size) => {
  $cookies.set('font-size', size)
  fontSize.value = size 
}

const setFontFamily = (event) => {
  const font = event.target.value
  $cookies.set('font-family', font)
  fontFamily.value = font
}

const saveAsEpub = () => EpubService.saveAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles)
const saveAsMobi = () => {}
const sendToKindle = () => {}

const previousPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.max(1, props.chapter - 1) } })
const previousPageDisabled = computed(() => props.chapter === 1)

const nextPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.min(props.story.chapters.length, props.chapter + 1) } })
const nextPageDisabled = computed(() => props.chapter === props.story.chapters.length)

const hasMultiplePages = computed(() => !previousPageDisabled.value || !nextPageDisabled.value)

const isHoveredPreviousChapter = ref(false)
const isHoveredNextChapter = ref(false)

const onHoverPreviousChapter = () => { isHoveredPreviousChapter.value = true }
const onUnhoverPreviousChapter = () => { isHoveredPreviousChapter.value = false }

const onHoverNextChapter = () => { isHoveredNextChapter.value = true }
const onUnhoverNextChapter = () => { isHoveredNextChapter.value = false }
</script>

<template>
  <main>
    <div class="float border" :class="[semitransparentBgClass, themeStore.borderColor]">
      <div class="settings">
        <div class="btn-group">
          <p :class="themeStore.primaryTextColor">{{ t("reader.download") }}</p>
          <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="saveAsMobi">MOBI</button>
          <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="saveAsEpub">ePUB</button>
          <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="sendToKindle">{{ t("reader.sendToKindle") }}</button>
        </div>
        <div class="btn-group font-settings">
          <p class="font-settings-a" :class="themeStore.primaryTextColor">{{ t("reader.font") }}</p>
          <select class="font-settings-b" :class="themeStore.primaryTextColor" v-model="fontFamily" @change="(event) => setFontFamily(event)">
            <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Times New Roman';">Times New Roman</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: Georgia;">Georgia</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: Arial;">Arial</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: Verdana;">Verdana</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Segoe UI';">Segoe UI</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Josefin Sans';">Josefin Sans</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Yeseva One';">Yeseva One</option>
            <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Madimi One';">Madimi One</option>
          </select>
          <span class="font-settings-c" :class="themeStore.primaryTextColor">{{ fontSize * 10 }}</span>
          <button class="font-settings-d" @click="() => setFontSize(fontSize + 0.25)" :class="themeStore.primaryTextColor">+</button>
          <button class="font-settings-e" @click="() => setFontSize(1.25)" :class="themeStore.primaryTextColor">100%</button>
          <button class="font-settings-f" @click="() => setFontSize(fontSize - 0.25)" :class="themeStore.primaryTextColor">-</button>
        </div>
      </div>
    </div>
    <div class="white-panel transition" :class="[themeStore.primaryBackgroundColor, themeStore.borderColor]">
      <div class="stats font-segoe" :class="themeStore.secondaryTextColor">{{ charactersCount }} {{ t("reader.signs") }} | &copy; {{ props.story.year }}</div>
      <div class="title" :class="themeStore.primaryTextColor">{{ props.story.title }}</div>
      <div class="chapter-pager" v-if="hasMultiplePages">
        <div class="prev-chapter" :class="[themeStore.secondaryTextColor, previousPageDisabled ? 'transparent' : '', isHoveredPreviousChapter ? themeStore.primaryLinkColor : '']">
          <div class="arrow">←</div>
          <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter - 2] ? 'gapped' : '']" @mouseenter="onHoverPreviousChapter" @mouseleave="onUnhoverPreviousChapter" @click="previousPage">
            <div class="prev-scene">{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}</div>
            <div v-if="story.chapterTitles" class="prev-chapterTitle">{{ props.story.chapterTitles[props.chapter - 2] }}</div>
          </div>
        </div>
        <div class="scene-and-title" :class="[story.chapterTitles ? 'gapped' : '']">
          <div class="scene">{{ t("reader.epub-chapter") }} {{ props.chapter }}</div>
          <div v-if="story.chapterTitles" class="chapterTitle">{{ props.story.chapterTitles[props.chapter - 1] }}</div>
        </div>
        <div class="next-chapter" :class="[themeStore.secondaryTextColor, nextPageDisabled ? 'transparent' : '', isHoveredNextChapter ? themeStore.primaryLinkColor : '']">
          <div class="arrow">→</div>
          <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter] ? 'gapped' : '']" @mouseenter="onHoverNextChapter" @mouseleave="onUnhoverNextChapter" @click="nextPage">
            <div class="next-scene">{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}</div>
            <div v-if="story.chapterTitles" class="next-chapterTitle">{{ props.story.chapterTitles[props.chapter] }}</div>
          </div>
        </div>
      </div>
      <div v-for="paragraph in paragraphs" class="paragraph" :class="themeStore.primaryTextColor" :style="{ 'font-size': `${fontSize}rem`, 'font-family': fontFamily }">
        {{ paragraph }}
      </div>
      <div v-if="nextPageDisabled" class="title" :class="themeStore.primaryTextColor">{{ t("reader.theEnd") }}</div>
      <div v-if="hasMultiplePages" class="btn-group page-buttons">
        <button :disabled="previousPageDisabled" :class="themeStore.primaryTextColor" @click="previousPage">{{ t("reader.previousChapter") }}</button>
        <button :disabled="nextPageDisabled":class="themeStore.primaryTextColor" @click="nextPage">{{ t("reader.nextChapter") }}</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.white-panel {
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;
}

.arrow {
  font-size: 1.25rem;
}

.navigable {
  cursor: pointer;
}

.transparent {
  color: transparent !important;
}

.gapped {
  gap: 0.5rem;
}

.scene-and-title {
  display: flex;
  flex-direction: column;
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

.border {
  border-top-width: 1px;
  border-top-style: solid;
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.dark-mode-semitransparent-bg {
  background-color: rgba(30, 54, 54, 0.65);
}

.light-mode-semitransparent-bg {
  background-color: rgba(255, 255, 255, 0.65);
}

.sepia-mode-semitransparent-bg {
  background-color: rgba(236, 228, 202, 0.65);
}

.btn-group {
  width: fit-content;
}

.btn-group button {
  transition: font-size 1s ease;
  border: 1px solid darkgoldenrod;
  padding: 0.5rem 1rem;
  background: none;
  cursor: pointer;
  float: left;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group button:disabled {
  color: gray !important;
}

.btn-group button:disabled:hover {
  color: gray !important;
  background-color: darkgray !important;
}

.btn-group p {
  transition: font-size 1s ease;
  border: 1px solid darkgoldenrod;
  padding: 0.5rem 1rem;
  float: left;
  font-weight: bold;
  margin: 0;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group span {
  transition: font-size 1s ease;
  border: 1px solid darkgoldenrod;
  padding: 0.5rem 1rem;
  float: left;
  margin: 0;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group select {
  transition: font-size 1s ease;
  border: 1px solid darkgoldenrod;
  padding: 0.45rem 1rem;
  float: left;
  outline: none;
  margin: 0;
  background: none;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.btn-group :first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.btn-group :last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.btn-group :not(:last-child) {
  border-right: none;
}

.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

.btn-group button:hover {
  background-color: darkgoldenrod;
}

.btn-group button:active {
  background-color: limegreen;
}

.page-buttons {
  margin-top: 2rem;
  display: grid !important;
  grid-template-columns: 50% 50% !important;
  width: 100% !important;
}

.float {
  transition: background 1s ease;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.settings {
  display: flex;
  gap: 2rem;
  justify-content: center;
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
  font-size: 0.80rem;
  text-align: center;
  letter-spacing: 0.15rem;
  margin-top: 2rem;
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

.paragraph {
  transition: color 1s ease, font-size 1s ease;
  text-align: justify;
  margin-top: 0.5rem;
  text-indent: 2rem;
}

.transition {
  transition: background 1s ease;
  margin-bottom: 4rem;
}

@media screen and (max-width: 1600px) {
  .border {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .white-panel {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .btn-group button {
    font-size: 0.90rem;
  }

  .btn-group p {
    font-size: 0.90rem;
  }

  .btn-group select {
    font-size: 0.90rem;
  }
  
  .btn-group span {
    font-size: 0.90rem;
  }
}

@media screen and (max-width: 1440px) {
  .settings {
    gap: 1rem;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1280px) {
  .border {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .white-panel {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .btn-group button {
    font-size: 0.75rem;
  }

  .btn-group p {
    font-size: 0.75rem;
  }

  .btn-group select {
    font-size: 0.75rem;
  }
  
  .btn-group span {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 1024px) {
  .float {
    padding-bottom: 1rem !important;
    padding-top: 1rem !important;
  }
}

@media screen and (max-width: 530px) {
  .font-settings {
    display: grid !important;
    grid-template-areas: 
      "a b b b"
      "c d e f" !important; 
  }

  .font-settings :first-child {
    border-top-left-radius: 0.5rem !important;
    border-bottom-left-radius: 0 !important;
    border-bottom: none;
  }

  .font-settings :nth-child(2) {
    border-top-right-radius: 0.5rem !important;
    border-right: 1px solid #e69b54 !important;
    border-bottom: none;
  }

  .font-settings :nth-child(3) {
    border-bottom-left-radius: 0.5rem !important;
  }
  
  .font-settings :last-child {
    border-bottom-right-radius: 0.5rem !important;
    border-top-right-radius: 0 !important;
  }

  .font-settings-a {
    grid-area: a;
  }

  .font-settings-b {
    grid-area: b;
  }

  .font-settings-c {
    grid-area: c;
  }

  .font-settings-d {
    grid-area: d;
  }

  .font-settings-e {
    grid-area: e;
  }

  .font-settings-f {
    grid-area: f;
  }
}
</style>
