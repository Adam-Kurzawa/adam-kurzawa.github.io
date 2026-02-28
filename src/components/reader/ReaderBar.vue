<script setup>
import { onMounted, ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { useTranslation, useUrl } from '@/utils/hooks'
import SendToKindle from './SendToKindle.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import SecondaryButton from '../system/SecondaryButton.vue'
import ChaptersIcon from '../icons/ChaptersIcon.vue'
import CommentIcon from '../icons/CommentIcon.vue'
import DownloadIcon from '../icons/DownloadIcon.vue'
import SendIcon from '../icons/SendIcon.vue'
import ShareIcon from '../icons/ShareIcon.vue'
import IconButton from '../system/IconButton.vue'
import BookmarkIcon from '../icons/BookmarkIcon.vue'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps([ 'fontSize', 'fontFamily', 'story', 'chapter' ])

const scrollCookieName = encodeURIComponent(`${props.story.title}_scroll`)
const chapterCookieName = encodeURIComponent(`${props.story.title}_chapter`)

const t = useTranslation()
const url = useUrl()
const cookies = useCookies([ scrollCookieName, chapterCookieName ])
const notificationStore = useNotificationStore()

const isBookmarked = ref()
const kindleModalOpen = ref(false)

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
		notificationStore.info('Usunięto zakładkę')
	} else {
		const appHeight = document.querySelector('#app').clientHeight
		const scrollPosition = window.scrollY
		const progress = scrollPosition / appHeight
	
		notificationStore.success('Zapisano zakładkę')

		cookies.set(scrollCookieName, progress)
		cookies.set(chapterCookieName, props.chapter)
		isBookmarked.value = true
	}
}

onMounted(() => {
	const cookieValue = cookies.get(scrollCookieName)
	const chapterCookie = parseInt(cookies.get(chapterCookieName) ?? '-1')
	isBookmarked.value = cookieValue !== undefined && cookieValue !== null

	if(chapterCookie === props.chapter) {
		const progress = parseFloat(cookieValue ?? '0')
		const appHeight = document.querySelector('#app').clientHeight
		const viewportHeight = window.innerHeight
		const scrollY = Math.min(appHeight - viewportHeight, appHeight * progress)
		window.scroll(window.scrollX, scrollY)
		notificationStore.info('Przywrócono postęp czytania')
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
	<SendToKindle :story="props.story" :visible="kindleModalOpen" @hide="hideSendToKindleModal" />
	<div class="flex fixed justify-center bg-white py-8 top-[6rem] w-full gap-8 z-50 shadow-lg">
		<div class="flex items-center gap-2">
			<SecondaryButton value="Rozdziały" @click="$emit('show-chapters')">
				<ChaptersIcon />
			</SecondaryButton>
			<SecondaryButton :value="t('reader.comments.header')" @click="$emit('show-comments')" >
				<CommentIcon />
			</SecondaryButton>
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
		<div class="flex items-center gap-2">
			<select @change="(event) => $emit('set-font-family', event.target.value)" class="flex items-center justify-between w-[11rem] px-4 py-2 bg-slate-50 border border-slate-100 rounded-[0.5rem] !text-sm text-semibold text-slate-400 transition-all">
				<option value="Times New Roman" :style="{ fontFamily: 'Times New Roman' }">Times New Roman</option>
				<option value="Georgia" :style="{ fontFamily: 'Georgia' }">Georgia</option>
				<option value="Arial" :style="{ fontFamily: 'Arial' }">Arial</option>
				<option value="Verdana" :style="{ fontFamily: 'Verdana' }">Verdana</option>
				<option value="Segoe UI" :style="{ fontFamily: 'Segoe UI' }">Segoe UI</option>
			</select>
			<div class="flex flex-row">
				<SecondaryButton class="rounded-br-none rounded-tr-none" value="+" @click="$emit('increase-font-size')" />
				<SecondaryButton class="rounded-bl-none rounded-tl-none border-l-0" value="-" @click="$emit('decrease-font-size')" :disabled="props.fontSize <= 0.25" />
			</div>
		</div>
	</div>
</template>
