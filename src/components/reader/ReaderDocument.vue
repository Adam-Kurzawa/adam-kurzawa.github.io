<script setup>
import { computed } from 'vue'
import { useTranslation } from '@/utils/useTranslation'
import Header1 from '../system/Header1.vue'
import Header2 from '../system/Header2.vue'
import { useGalleryStore } from '@/stores/gallery'
import { numberify } from '@/utils/numberify'

const props = defineProps([ 'metadata', 'htmlChapters', 'chapterNumber', 'font' ])

const t = useTranslation()
const galleryStore = useGalleryStore()

const isLastPage = computed(() => props.chapterNumber === props.metadata.chaptersCount)

const onClick = (event) => {
	const target = event.target
	if (!(target instanceof Element)) 
		return

	const img = target.closest('img')
	if (!img) 
		return

	const src = img.getAttribute('src')
	galleryStore.open([ src ])
}
</script>

<template>
	<div class="py-10 px-15 rounded-[1rem] bg-white border-slate-200 border-1">
		<div class="mb-20 text-center space-y-5">
			<div class="flex items-center justify-center gap-4 !text-xs !font-semibold text-slate-300 uppercase tracking-[0.2em] mt-2 mb-4">
				<span>{{ Number(props.metadata.charactersCount).toLocaleString('pl-PL') }} {{ t("reader.signs") }}</span>
				<span class="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
				<span>&copy; {{ props.metadata.publicationDate }}</span>
			</div>
			<Header1 class="!mt-10" :value="props.metadata.title" />
		</div>
		<div id="reader-document" class="text-justify" :style="{ fontSize: `${props.font.size.value}rem`, fontFamily: props.font.family.value }">
			<div v-html="props.htmlChapters[props.chapterNumber - 1]" @click="onClick"></div>
		</div>
		<Header1 v-if="isLastPage" class="w-full text-center !mt-10" :value="t('reader.theEnd')" />
	</div>
</template>

<style>
#reader-document > div > * {
	margin-bottom: 0.5rem;
}

#reader-document > div > blockquote {
	border-left-width: 0.5rem;
	border-left-color: lightgrey;
	padding: 2rem;
	margin-left: 2rem;
}

#reader-document > div > pre:has(> code[class*="language-"]) {
	background-color: lightgrey;
	padding: 2rem;
	border-radius: 0.5rem;
	font-size: 80%;
}

#reader-document > div > pre:has(> code[class*="language-"]) {
	background-color: lightgrey;
	padding: 2rem;
	border-radius: 0.5rem;
	font-size: 80%;
}

.code-inline {
	background-color: lightgrey;
	border-radius: 0.5rem;
	padding: 0.10rem 0.25rem;
	font-size: 80%;
}
</style>
