<script setup>
import { computed, ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { countCharacters } from '@/utils/functions'
import { useThemeStore } from '@/stores/theme'
import H3 from './headers/H3.vue'
import TextButton from './buttons/TextButton.vue'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'

const props = defineProps([ 'story', 'chapter' ])

const router = useRouter()
const route = useRoute()
const t = useTranslation()
const themeStore = useThemeStore()
const firestore = useFirestore()

const fontSize = ref($cookies.get('font-size') ?? 1.25)
const fontFamily = ref($cookies.get('font-family') ?? 'Times New Roman')

const paragraphs = computed(() => props.story.chapters[props.chapter - 1])
const charactersCount = computed(() => countCharacters(props.story.chapters))

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
const onHoverPreviousChapter = () => { isHoveredPreviousChapter.value = true }
const onUnhoverPreviousChapter = () => { isHoveredPreviousChapter.value = false }

const isHoveredNextChapter = ref(false)
const onHoverNextChapter = () => { isHoveredNextChapter.value = true }
const onUnhoverNextChapter = () => { isHoveredNextChapter.value = false }

const commentsFirestoreCollection = collection(firestore, `${route.params.title}_${route.params.lang}_comments`)
const comments = useCollection(commentsFirestoreCollection)

const areCommentsVisible = ref(false)
const closeComments = () => { areCommentsVisible.value = false }
const showComments = () => { areCommentsVisible.value = true }

const commentInputName = ref('')
const commentInputText = ref('')
const addComment = () => { 
  const newComment = {
    name: commentInputName.value,
    text: commentInputText.value
  }

  try {
    addDoc(commentsFirestoreCollection, newComment)
    commentInputName.value = ''
    commentInputText.value = ''
  } catch (e) {
    console.error('Cannot add a comment: ', e);
  }
}

const commentsOverlayBackground = computed(() => `comments-overlay-${themeStore.currentTheme}`)
const commentInputNamePlaceholderColor = computed(() => `comment-input-name-${themeStore.currentTheme}`)
const commentInputTextPlaceholderColor = computed(() => `comment-input-text-${themeStore.currentTheme}`)
</script>

<template>
  <div>
    <div class="comments-overlay" :class="[ areCommentsVisible ? 'comments-visible' : 'comments-hidden', commentsOverlayBackground ]">
      <div></div>
      <div class="comments" :class="[ themeStore.borderColor, themeStore.primaryBackgroundColor ]">
        <div class="comments-title-bar">
          <button class="close-comments" @click="closeComments">x</button>
          <H3 class="comments-title" text="Komentarze" />
          <div></div>
        </div>
        <div class="comments-list" v-if="comments.length !== 0">
          <div class="comment font-segoe" :class="[ themeStore.secondaryBackgroundColor, themeStore.primaryTextColor ]" v-for="comment in comments">
            <div class="comment-name">{{ comment.name }}</div>
            <div class="font-segoe">{{ comment.text }}</div>
          </div>
        </div>
        <div class="font-segoe" :class="themeStore.primaryTextColor" v-if="comments.length === 0">
          Brak komentarzy
        </div>
        <div class="comment-input" :class="themeStore.secondaryBackgroundColor">
          <input class="comment-input-name font-segoe" v-model="commentInputName" placeholder="Pseudonim komentującego..." :class="[ themeStore.primaryTextColor, commentInputNamePlaceholderColor ]" type="text" />
          <div class="comment-input-bottom-line">
            <textarea class="comment-input-text font-segoe" v-model="commentInputText" placeholder="Tekst komentarza..." :class="[ themeStore.primaryTextColor, commentInputTextPlaceholderColor ]" />
            <TextButton text="Dodaj" :action="addComment" />
          </div>
        </div>
      </div>
    </div>
    <div class="floating-bar" :class="[themeStore.primaryBackgroundColor, themeStore.borderColor]">
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
      <div class="btn-group">
        <p @click="showComments">Komentarze</p>
      </div>
    </div>
    <div class="white-panel" :class="[themeStore.primaryBackgroundColor, themeStore.borderColor]">
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
        <div class="scene-and-title" :class="[themeStore.primaryTextColor, story.chapterTitles ? 'gapped' : '']">
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
      <div class="bottom-chapter-pager" v-if="hasMultiplePages">
        <div class="prev-chapter" :class="[themeStore.secondaryTextColor, previousPageDisabled ? 'transparent' : '', isHoveredPreviousChapter ? themeStore.primaryLinkColor : '']">
          <div class="arrow">←</div>
          <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter - 2] ? 'gapped' : '']" @mouseenter="onHoverPreviousChapter" @mouseleave="onUnhoverPreviousChapter" @click="previousPage">
            <div class="prev-scene">{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}</div>
            <div v-if="story.chapterTitles" class="prev-chapterTitle">{{ props.story.chapterTitles[props.chapter - 2] }}</div>
          </div>
        </div>
        <div class="next-chapter" :class="[themeStore.secondaryTextColor, nextPageDisabled ? 'transparent' : '', isHoveredNextChapter ? themeStore.primaryLinkColor : '']">
          <div class="arrow">→</div>
          <div class="scene-and-title navigable" :class="[story.chapterTitles && story.chapterTitles[props.chapter] ? 'gapped' : '']" @mouseenter="onHoverNextChapter" @mouseleave="onUnhoverNextChapter" @click="nextPage">
            <div class="next-scene">{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}</div>
            <div v-if="story.chapterTitles" class="next-chapterTitle">{{ props.story.chapterTitles[props.chapter] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 200;
}

.comments-overlay-light {
  background-color: rgba(256, 256, 256, 0.65);
}

.comments-overlay-sepia {
  background-color: rgba(236, 228, 202, 0.65);
}

.comments-overlay-dark {
  background-color: rgba(0, 0, 0, 0.65);
}

.comments-visible {
  visibility: visible;
} 

.comments-hidden {
  visibility: hidden;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-width: 1px;
  border-style: solid;
  height: calc(100vh - 4.1rem);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 0.5rem;
}

.comment {
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
}

.comment-name {
  font-weight: bold;
  margin-bottom: 0.15rem;
}

.comments-title-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.close-comments {
  font-size: 2rem;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
}

.comments-title {
  justify-self: center;
  margin-top: 0.65rem;
}

.comment-input {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 0.5rem;
}

.comment-input-bottom-line {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0;
}

.comment-input-name {
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 0.85rem;
  outline: none;
  background-color: transparent;
}

.comment-input-text-light::placeholder,
.comment-input-name-light::placeholder {
  color: slategray;
}

.comment-input-text-sepia::placeholder,
.comment-input-name-sepia::placeholder {
  color: darkslategray;
}

.comment-input-text-dark::placeholder,
.comment-input-name-dark::placeholder {
  color: lightgray;
}

.comment-input-text {
  padding: 0.5rem;
  flex: 1;
  min-height: 3rem;
  height: 3rem;
  max-height: 3rem;
  font-size: 0.85rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  background-color: transparent;
  resize: none;
}

.white-panel {
  transition: padding 0.5s ease, background 0.5s ease;
  margin-bottom: 4rem;
  padding-left: 4rem;
  padding-right: 4rem;
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

.floating-bar {
  display: flex;
  gap: 2rem;
  justify-content: center;
  transition: background 0.5s ease, padding 0.5s ease;
  position: fixed;
  top: 5.5rem;
  left: 0;
  width: 100%;
  z-index: 100;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

@media screen and (max-width: 1600px) {
  .comments-overlay {
    grid-template-columns: 45% 55%;
  }

  .floating-bar {
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
  .comments-overlay {
    grid-template-columns: 40% 60%;
  }

  .floating-bar {
    gap: 1rem;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1280px) {
  .comments-overlay {
    grid-template-columns: 30% 70%;
  }

  .floating-bar {
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
  .comments-overlay {
    grid-template-columns: 0% 100%;
  }

  .comments {
    padding: 2rem;
    border: none;
    border-radius: 0;
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
