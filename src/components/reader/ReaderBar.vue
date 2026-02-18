<script setup>
import { h, onMounted, ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { useTranslation, useUrl } from '@/utils/hooks'
import { ShareAltOutlined, SendOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import SendToKindle from './../SendToKindle.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import SecondaryButton from '../system/SecondaryButton.vue'
import ChaptersIcon from '../icons/ChaptersIcon.vue'
import PrimaryButton from '../system/PrimaryButton.vue'
import CommentIcon from '../icons/CommentIcon.vue'

const props = defineProps([ 'fontSize', 'fontFamily', 'story', 'chapter' ])

const t = useTranslation()
const url = useUrl()
const cookies = useCookies()

const isBookmarked = ref()
const bookmarkTooltipVisible = ref(false)
const kindleModalOpen = ref(false)

const hideBookmarkTooltip = () => {
	bookmarkTooltipVisible.value = false
}

const showBookmarkTooltip = () => {
	bookmarkTooltipVisible.value = true
	setTimeout(hideBookmarkTooltip, 5_000)
}

const showSendToKindleModal = () => {
	kindleModalOpen.value = true
}

const hideSendToKindleModal = () => {
    kindleModalOpen.value = false
}

const bookmarkProgress = () => {
	if(isBookmarked.value) {
		cookies.remove(`${props.story.title} scroll`)
		cookies.remove(`${props.story.title} chapter`)
		isBookmarked.value = false
		showBookmarkTooltip()
	} else {
		const appHeight = document.querySelector('#app').clientHeight
		const scrollPosition = window.scrollY
		const progress = scrollPosition / appHeight
		cookies.set(`${props.story.title} scroll`, progress)
		cookies.set(`${props.story.title} chapter`, props.chapter)
		isBookmarked.value = true
		showBookmarkTooltip()
	}
}

onMounted(() => {
	const cookieValue = cookies.get(`${props.story.title} scroll`)
	const chapterCookie = parseInt(cookies.get(`${props.story.title} chapter`) ?? '-1')
	isBookmarked.value = cookieValue !== undefined && cookieValue !== null

	if(chapterCookie === props.chapter) {
		const progress = parseFloat(cookieValue ?? '0')
		const appHeight = document.querySelector('#app').clientHeight
		const viewportHeight = window.innerHeight
		const scrollY = Math.min(appHeight - viewportHeight, appHeight * progress)
		window.scroll(window.scrollX, scrollY)
	}
})

const saveAsEpub = () => EpubService.saveAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles, props.story.tags, 'pl')

const share = () => {
	navigator.share({
		url: url.value,
		title: props.story.title,
		text: 'Alternata - personal blog by Adam Kurzawa'
	})
}
</script>

<template>
	<div class="flex fixed justify-center bg-white py-8 top-[6rem] w-full gap-8">
		<div class="flex items-center gap-2">
			<SecondaryButton value="Rozdziały" @click="$emit('show-chapters')">
				<ChaptersIcon />
			</SecondaryButton>
			<PrimaryButton :value="t('reader.comments.header')" @click="$emit('show-comments')" >
				<CommentIcon />
			</PrimaryButton>
			<button @click="bookmarkProgress" :class="[ isBookmarked ? '!text-sky-600' : '!text-slate-400' ]" class="p-2 rounded-xl border transition-all bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark" aria-hidden="true">
					<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
				</svg>
			</button>
		</div>
		<a-button-group>
      		<a-button :icon="h(DownloadOutlined)" @click="saveAsEpub">{{ t('reader.bar.download-epub') }}</a-button>
			<a-button :icon="h(SendOutlined)" @click="showSendToKindleModal">{{ t('send-to-kindle.button') }}</a-button>
      		<SendToKindle :story="props.story" :visible="kindleModalOpen" @hide="hideSendToKindleModal" />
			<a-button :icon="h(ShareAltOutlined)" @click="share">{{ t('reader.bar.share') }}</a-button>
		</a-button-group>
		<a-select v-model:value="props.fontFamily" style="width: 10rem" @change="(value) => $emit('set-font-family', value)">
			<a-select-option value="Times New Roman" :style="{ fontFamily: 'Times New Roman' }">Times New Roman</a-select-option>
			<a-select-option value="Georgia" :style="{ fontFamily: 'Georgia' }">Georgia</a-select-option>
			<a-select-option value="Arial" :style="{ fontFamily: 'Arial' }">Arial</a-select-option>
			<a-select-option value="Verdana" :style="{ fontFamily: 'Verdana' }">Verdana</a-select-option>
			<a-select-option value="Segoe UI" :style="{ fontFamily: 'Segoe UI' }">Segoe UI</a-select-option>
			<a-select-option value="Josefin Sans" :style="{ fontFamily: 'Josefin Sans' }">Josefin Sans</a-select-option>
			<a-select-option value="Yeseva One" :style="{ fontFamily: 'Yeseva One' }">Yeseva One</a-select-option>
			<a-select-option value="Madimi One" :style="{ fontFamily: 'Madimi One' }">Madimi One</a-select-option>
		</a-select>
		<a-button-group>
			<a-button disabled :style="{ minWidth: '3.5rem', width: '3.5rem', maxWidth: '3.5rem' }">{{ props.fontSize * 10 }}</a-button>
			<a-button @click="$emit('increase-font-size')">+</a-button>
			<a-button @click="$emit('default-font-size')">100%</a-button>
			<a-button @click="$emit('decrease-font-size')" :disabled="props.fontSize <= 0.25">-</a-button>
		</a-button-group>
	</div>
</template>

<style scoped>
.floating-bar {
	display: flex;
	gap: 1rem;
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
	padding-top: 0.5rem;
	padding-bottom: 1rem;
}

@media screen and (max-width: 1600px) {
	.floating-bar {
		padding-left: 2rem;
		padding-right: 2rem;
	}
}

@media screen and (max-width: 1440px) {
	.floating-bar {
		gap: 1rem;
		flex-wrap: wrap;
	}
}

@media screen and (max-width: 1280px) {
	.floating-bar {
		padding-left: 1rem;
		padding-right: 1rem;
	}
}

@media screen and (max-width: 500px) {
	.floating-bar {
		padding-top: 0;
		padding-bottom: 0.5rem;
		row-gap: 0.5rem;
	}
}
</style>
