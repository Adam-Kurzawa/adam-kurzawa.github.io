<script setup>
import { computed, ref } from 'vue'
import Panel from './Panel.vue'
import { PdfService } from '@/utils/PdfService.js'
import { EpubService } from '@/utils/EpubService.js'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'

const props = defineProps(['story', 'chapter'])

const router = useRouter()
const route = useRoute()
const t = useTranslation()

const theme = ref($cookies.get('theme') ?? 'dark')
const fontSize = ref($cookies.get('font-size') ?? 1.25)
const fontFamily = ref($cookies.get('font-family') ?? 'Times New Roman')

const paragraphs = computed(() => props.story.chapters[props.chapter - 1])
const charactersCount = computed(() => props.story.chapters.reduce(
  (accumulator, chapter) => accumulator + chapter.reduce((intermediate, paragraph) => intermediate + paragraph.length, 0),
  0,
))

const semitransparentBgClass = computed(() => `${theme.value}-mode-semitransparent-bg`)
const solidBgClass = computed(() => `${theme.value}-mode-bg`)
const textClass = computed(() => `${theme.value}-mode-text`)

const setTheme = (t) => {
  $cookies.set('theme', t)
  theme.value = t
}

const setFontSize = (size) => {
  $cookies.set('font-size', size)
  fontSize.value = size 
}

const setFontFamily = (event) => {
  const font = event.target.value
  $cookies.set('font-family', font)
  fontFamily.value = font
}

// const saveAsPdf = () => PdfService.saveAsPdf(props.story.title, props.story.chapters)
const saveAsEpub = () => EpubService.saveAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles)
const saveAsMobi = () => {}
const sendToKindle = () => {}

const previousPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.max(1, props.chapter - 1) } })
const previousPageDisabled = computed(() => props.chapter === 1)

const nextPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.min(props.story.chapters.length, props.chapter + 1) } })
const nextPageDisabled = computed(() => props.chapter === props.story.chapters.length)

const isOnePager = computed(() => !previousPageDisabled.value || !nextPageDisabled.value)
</script>

<template>
  <main>
    <div class="float border" :class="[semitransparentBgClass]">
      <div class="settings">
        <div class="btn-group">
          <p :class="[textClass]">{{ t("reader.download") }}</p>
          <button href="#" class="font-segoe" :class="[textClass]" @click="saveAsMobi">MOBI</button>
          <button href="#" class="font-segoe" :class="[textClass]" @click="saveAsEpub">ePUB</button>
          <button href="#" class="font-segoe" :class="[textClass]" @click="sendToKindle">{{ t("reader.sendToKindle") }}</button>
        </div>
        <div class="btn-group">
          <p :class="[textClass]">{{ t("reader.theme") }}</p>
          <button @click="() => setTheme('light')" :class="[textClass]">{{ t("reader.light") }}</button>
          <button @click="() => setTheme('sepia')" :class="[textClass]">{{ t("reader.sepia") }}</button>
          <button @click="() => setTheme('dark')" :class="[textClass]">{{ t("reader.dark") }}</button>
        </div>
        <div class="btn-group font-settings">
          <p class="font-settings-a" :class="[textClass]">{{ t("reader.font") }}</p>
          <select class="font-settings-b" :class="[textClass]" v-model="fontFamily" @change="(event) => setFontFamily(event)">
            <option :class="[solidBgClass]" style="font-family: 'Times New Roman';">Times New Roman</option>
            <option :class="[solidBgClass]" style="font-family: Georgia;">Georgia</option>
            <option :class="[solidBgClass]" style="font-family: Arial;">Arial</option>
            <option :class="[solidBgClass]" style="font-family: Verdana;">Verdana</option>
            <option :class="[solidBgClass]" style="font-family: 'Segoe UI';">Segoe UI</option>
            <option :class="[solidBgClass]" style="font-family: 'Josefin Sans';">Josefin Sans</option>
            <option :class="[solidBgClass]" style="font-family: 'Yeseva One';">Yeseva One</option>
            <option :class="[solidBgClass]" style="font-family: 'Madimi One';">Madimi One</option>
          </select>
          <span class="font-settings-c" :class="[textClass]">{{ fontSize * 10 }}</span>
          <button class="font-settings-d" @click="() => setFontSize(fontSize + 0.25)" :class="[textClass]">+</button>
          <button class="font-settings-e" @click="() => setFontSize(1.25)" :class="[textClass]">100%</button>
          <button class="font-settings-f" @click="() => setFontSize(fontSize - 0.25)" :class="[textClass]">-</button>
        </div>
      </div>
    </div>
    <Panel class="transition" :class="[solidBgClass]">
      <div class="stats font-segoe">{{ charactersCount }} {{ t("reader.signs") }} | &copy; {{ props.story.year }}</div>
      <div class="title" :class="[textClass]">{{ props.story.title }}</div>
      <div v-if="isOnePager" class="scene" :class="[textClass]">{{ t("reader.epub-chapter") }} {{ props.chapter }}</div>
      <div v-if="isOnePager && story.chapterTitles" class="chapterTitle" :class="[textClass]">{{ props.story.chapterTitles[props.chapter - 1] }}</div>
      <div
        v-for="paragraph in paragraphs"
        class="paragraph"
        :class="[textClass]"
        :style="{ 'font-size': `${fontSize}rem`, 'font-family': fontFamily }"
      >
        {{ paragraph }}
      </div>
      <div v-if="nextPageDisabled" class="title" :class="[textClass]">{{ t("reader.theEnd") }}</div>
      <div v-if="isOnePager" class="btn-group page-buttons">
        <button :disabled="previousPageDisabled" :class="[textClass]" @click="previousPage">{{ t("reader.previousChapter") }}</button>
        <button :disabled="nextPageDisabled":class="[textClass]" @click="nextPage">{{ t("reader.nextChapter") }}</button>
      </div>
    </Panel>
  </main>
</template>

<style scoped>
.border {
  border-top: 1px solid gray;
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.dark-mode-bg {
  background-color: rgb(30, 54, 54);
}

.light-mode-bg {
  background-color: white;
}

.sepia-mode-bg {
  background-color: rgb(236, 228, 202);
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

.dark-mode-text {
  color: white;
}

.light-mode-text {
  color: black;
}

.sepia-mode-text {
  color: black;
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
  color: grey;
  margin-top: 2rem;
}

.scene {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.chapterTitle {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.paragraph {
  transition: color 1s ease, font-size 1s ease;
  text-align: justify;
  margin-top: 0.5rem;
  text-indent: 2rem;
}

.transition {
  transition: background 1s ease;
  margin-bottom: 10rem;
}

@media screen and (max-width: 1600px) {
  .border {
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
