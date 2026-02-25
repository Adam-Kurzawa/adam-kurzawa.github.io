<script setup>
import { onMounted, ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { useTranslation, useUrl } from '@/utils/hooks'
import SendToKindle from './../SendToKindle.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import SecondaryButton from '../system/SecondaryButton.vue'
import ChaptersIcon from '../icons/ChaptersIcon.vue'
import PrimaryButton from '../system/PrimaryButton.vue'
import CommentIcon from '../icons/CommentIcon.vue'
import DownloadIcon from '../icons/DownloadIcon.vue'
import SendIcon from '../icons/SendIcon.vue'
import ShareIcon from '../icons/ShareIcon.vue'
import IconButton from '../system/IconButton.vue'
import BookmarkIcon from '../icons/BookmarkIcon.vue'
import Modal from '../system/Modal.vue'

const props = defineProps([ 'fontSize', 'fontFamily', 'story', 'chapter' ])

const scrollCookieName = encodeURIComponent(`${props.story.title}_scroll`)
const chapterCookieName = encodeURIComponent(`${props.story.title}_chapter`)

const t = useTranslation()
const url = useUrl()
const cookies = useCookies([ scrollCookieName, chapterCookieName ])

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
		cookies.remove(scrollCookieName)
		cookies.remove(chapterCookieName)
		isBookmarked.value = false
		showBookmarkTooltip()
	} else {
		const appHeight = document.querySelector('#app').clientHeight
		const scrollPosition = window.scrollY
		const progress = scrollPosition / appHeight
		cookies.set(scrollCookieName, progress)
		cookies.set(chapterCookieName, props.chapter)
		isBookmarked.value = true
	console.log(cookies.getAll())
		showBookmarkTooltip()
	}
}

onMounted(() => {
	const cookieValue = cookies.get(scrollCookieName)
	const chapterCookie = parseInt(cookies.get(chapterCookieName) ?? '-1')
	isBookmarked.value = cookieValue !== undefined && cookieValue !== null
	console.log(cookies.getAll())

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
	<Modal title="Test" yes="Ok" no="No" :visibility="kindleModalOpen" @close="hideSendToKindleModal">Text</Modal>
	<div class="flex fixed justify-center bg-white py-8 top-[6rem] w-full gap-8 z-50 shadow-lg">
		<div class="flex items-center gap-2">
			<SecondaryButton value="Rozdziały" @click="$emit('show-chapters')">
				<ChaptersIcon />
			</SecondaryButton>
			<PrimaryButton :value="t('reader.comments.header')" @click="$emit('show-comments')" >
				<CommentIcon />
			</PrimaryButton>
			<IconButton @click="bookmarkProgress" :class="[ isBookmarked ? '!text-blue-900' : '!text-slate-600' ]">
				<BookmarkIcon />
			</IconButton>
		</div>
		<div class="lg:flex items-center gap-1 px-4 border-l border-r border-slate-100 dark:border-slate-800 h-8 mx-4">
			<SecondaryButton :value="t('send-to-kindle.button')" @click="showSendToKindleModal">
				<SendIcon />
			</SecondaryButton>
			<IconButton @click="saveAsEpub" class="!text-slate-600 dark:text-slate-400">
				<DownloadIcon />
			</IconButton>
			<IconButton @click="share" class="!text-slate-600 dark:text-slate-400">
				<ShareIcon />
			</IconButton>
		</div>
		<SendToKindle :story="props.story" :visible="kindleModalOpen" @hide="hideSendToKindleModal" />
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
