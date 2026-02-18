<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import Header3 from '../system/Header3.vue'
import CloseIcon from '../icons/CloseIcon.vue'
import IconButton from '../system/IconButton.vue'

const props = defineProps([ 'visible', 'story', 'chapter' ])

const t = useTranslation()
const router = useRouter()
const route = useRoute()

const chapterTitles = computed(() => {
	const titles = props.story.chapterTitles

	if(titles && titles !== null)
		return titles;
	else 
		return Array
			.apply(null, Array(props.story.chapters.length))
			.map((el, index) => `${t("reader.epub-chapter")} ${index + 1}`)
})

const jumpToChapter = (chapterNumber) => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: chapterNumber } })
</script>

<template>
	<div class="fixed inset-y-0 left-0 z-[250] w-80 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-in-out border-r border-slate-100 dark:border-slate-800 translate-x-0" v-bind:hidden="!props.visible">
		<div class="p-8 flex flex-col h-full">
			<div class="flex justify-between items-center mb-10">
				<Header3 class="mt-2" value="Spis treści" />
				<IconButton @click="$emit('hide-chapters')">
					<CloseIcon />
				</IconButton>
			</div>
			<div class="space-y-2 overflow-y-auto no-scrollbar flex-1">
				<button class="w-full text-left p-4 rounded-[0.5rem] transition-all group hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent" v-for="(chapterTitle, index) in chapterTitles" :class="[ (index + 1) === props.chapter ? '!bg-blue-50 !dark:bg-blue-900/20 border !border-blue-100 !dark:border-blue-900/30' : '' ]">
					<div v-if="(index + 1) === props.chapter" class="flex items-center gap-3" @click="() => jumpToChapter(index + 1)">
						<span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
						<span class="text-base font-medium text-blue-600 dark:text-blue-400">{{ chapterTitle }}</span>
					</div>
					<div v-else class="flex items-center gap-3" @click="() => jumpToChapter(index + 1)">
						<span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
						<span class="text-base font-medium text-slate-600 dark:text-slate-400">{{ chapterTitle }}</span>
					</div>
				</button>
			</div>
		</div>
	</div>
</template>
