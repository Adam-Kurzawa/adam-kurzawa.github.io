<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import { countCharacters } from '@/utils/functions'
import ReaderParagraph from './ReaderParagraph.vue'
import Header1 from '../system/Header1.vue'
import Header2 from '../system/Header2.vue'

const props = defineProps([ 'story', 'chapter', 'fontSize', 'fontFamily' ])

const router = useRouter()
const route = useRoute()
const t = useTranslation()

const paragraphs = computed(() => props.story.chapters[props.chapter - 1])
const charactersCount = computed(() => countCharacters(props.story.chapters))

const previousPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.max(1, props.chapter - 1) } })
const previousPageEnabled = computed(() => props.chapter !== 1)

const nextPage = () => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: Math.min(props.story.chapters.length, props.chapter + 1) } })
const nextPageDisabled = computed(() => props.chapter === props.story.chapters.length)
const nextPageEnabled = computed(() => props.chapter !== props.story.chapters.length)

const hasMultiplePages = computed(() => previousPageEnabled.value || nextPageEnabled.value)
</script>

<template>
	<div class="flex-grow items-center max-w-[1200px] mx-auto py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
		<div class="flex justify-between px-10 mb-10" v-if="hasMultiplePages">
			<button v-if="previousPageEnabled" @click="previousPage" class="flex items-center gap-2 !text-xs !font-semibold !uppercase tracking-widest !text-slate-400 hover:text-blue-600 transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true">
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}
			</button>
			<button v-else @click="previousPage" class="flex items-center gap-2 !text-xs !font-semibold !uppercase tracking-widest !text-slate-400 hover:text-blue-600 transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true">
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				Powrót do listy
			</button>
			<button v-if="nextPageEnabled" @click="nextPage" class="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 !text-white rounded-2xl !text-xs !font-semibold !uppercase tracking-[0.2em] hover:scale-105 transition-all">
				{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true">
					<path d="m9 18 6-6-6-6"></path>
				</svg>
			</button>
			<div v-else></div>
		</div>
		<div class="py-10 px-15 rounded-[1rem] bg-white border-slate-200 border-1">
			<div class="mb-20 text-center space-y-5">
				<div class="flex items-center justify-center gap-4 !text-xs !font-semibold text-slate-300 uppercase tracking-[0.2em] mt-2 mb-4">
					<span>{{ charactersCount }} {{ t("reader.signs") }}</span>
					<span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
					<span>&copy; {{ props.story.year }}</span>
				</div>
				<Header1 :value="props.story.title" />
			</div>
			<Header2 v-if="story.chapterTitles" class="mb-10" :value="props.story.chapterTitles[props.chapter - 1]" />
			<div class="flex flex-col gap-[0.5rem]">
				<ReaderParagraph v-for="(paragraph, index) in paragraphs" :key="`${props.chapter}_${index}`" :paragraph="paragraph" :index="index" :font-size="props.fontSize" :font-family="props.fontFamily" />
			</div>
			<Header1 class="w-full text-center mt-10" v-if="nextPageDisabled" :value="t('reader.theEnd')" />
		</div>
		<div class="flex justify-between px-10 mt-10" v-if="hasMultiplePages">
			<button v-if="previousPageEnabled" @click="previousPage" class="flex items-center gap-2 !text-xs !font-semibold !uppercase tracking-widest !text-slate-400 hover:text-blue-600 transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true">
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				{{ t("reader.epub-chapter") }} {{ props.chapter - 1 }}
			</button>
			<button v-else @click="previousPage" class="flex items-center gap-2 !text-xs !font-semibold !uppercase tracking-widest !text-slate-400 hover:text-blue-600 transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left" aria-hidden="true">
					<path d="m15 18-6-6 6-6"></path>
				</svg>
				Powrót do listy
			</button>
			<button v-if="nextPageEnabled" @click="nextPage" class="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 !text-white rounded-2xl !text-xs !font-semibold !uppercase tracking-[0.2em] hover:scale-105 transition-all">
				{{ t("reader.epub-chapter") }} {{ props.chapter + 1 }}
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true">
					<path d="m9 18 6-6-6-6"></path>
				</svg>
			</button>
			<div v-else></div>
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
	margin-top: 1rem;
	max-width: 100%;
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

.paragraphs {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.5rem;
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
    margin-left: 8%;
    margin-right: 8%;
  }
}

@media screen and (max-width: 1024px) {
  .white-panel {
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding-top: 6rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 0%;
    margin-right: 0%;
  }
}

@media screen and (max-width: 700px) {
  .white-panel {
    padding-top: 9rem;
  }
}
</style>
