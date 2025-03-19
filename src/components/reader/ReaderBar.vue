<script setup>
import { h, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EpubService } from '@/utils/EpubService.js'
import { useTranslation } from '@/utils/hooks'
import { ShareAltOutlined, OrderedListOutlined, SendOutlined, DownloadOutlined, BookOutlined, BookTwoTone } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const props = defineProps([ 'fontSize', 'fontFamily', 'story', 'chapter' ])

const { useToken } = theme
const { token } = useToken()

const t = useTranslation()
const router = useRouter()
const route = useRoute()

const chapterTitles = computed(() => {
  const titles = props.story.chapterTitles

  if(titles && titles !== null)
    return titles;
  else 
    return Array.apply(null, Array(props.story.chapters.length))
      .map((el, index) => `${t("reader.epub-chapter")} ${index + 1}`)
})

const isBookmarked = ref()
const bookmarkTooltipVisible = ref(false)
const menuChapterVisible = ref(false)

const hideBookmarkTooltip = () => {
  bookmarkTooltipVisible.value = false
}

const showBookmarkTooltip = () => {
  bookmarkTooltipVisible.value = true
  setTimeout(hideBookmarkTooltip, 5_000)
}

const bookmarkProgress = () => {
  if(isBookmarked.value) {
    $cookies.remove(`${props.story.title} scroll`)
    $cookies.remove(`${props.story.title} chapter`)
    isBookmarked.value = false
    showBookmarkTooltip()
  } else {
    const appHeight = document.querySelector('#app').clientHeight
    const scrollPosition = window.scrollY
    const progress = scrollPosition / appHeight
    $cookies.set(`${props.story.title} scroll`, progress)
    $cookies.set(`${props.story.title} chapter`, props.chapter)
    isBookmarked.value = true
    showBookmarkTooltip()
  }
}

onMounted(() => {
  const cookieValue = $cookies.get(`${props.story.title} scroll`)
  const chapterCookie = parseInt($cookies.get(`${props.story.title} chapter`) ?? '-1')
  isBookmarked.value = cookieValue !== undefined && cookieValue !== null

  if(chapterCookie === props.chapter) {
    const progress = parseFloat(cookieValue ?? '0')
    const appHeight = document.querySelector('#app').clientHeight
    const viewportHeight = window.innerHeight
    const scrollY = Math.min(appHeight - viewportHeight, appHeight * progress)
    window.scroll(window.scrollX, scrollY)
  }
})

const saveAsEpub = () => EpubService.saveAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles)
const sendToKindle = () => { console.log("Sent to Kindle!") }
const share = () => { console.log("Shared!") }
const jumpToChapter = (chapterNumber) => router.push({ name: 'reader', params: { lang: route.params.lang, title: route.params.title, chapter: chapterNumber } })
</script>

<template>
	<div class="floating-bar" :style="{ borderBottomColor: token.colorBorderSecondary, backgroundColor: token.colorBgContainer }">
		<a-button type="primary" @click="$emit('show-comments')">{{ t('reader.comments.header') }}</a-button>
    <a-popover v-model:open="menuChapterVisible" :title="t('reader.bar.chapters-menu-title')" trigger="click">
      <template #content>
        <a-timeline :style="{ marginTop: '2rem' }">
          <a-timeline-item v-for="(chapterTitle, index) in chapterTitles">
            <a-button type="link" :style="{ padding: '0', marginTop: '-1rem' }" @click="() => jumpToChapter(index + 1)">{{ chapterTitle }}</a-button>
          </a-timeline-item>
        </a-timeline>
      </template>
      <a-button :icon="h(OrderedListOutlined)"></a-button>
    </a-popover>
    <a-tooltip v-if="isBookmarked" placement="bottom" :open="bookmarkTooltipVisible" :title="t('reader.bar.bookmarked')">
      <a-button :icon="h(BookTwoTone)" @click="bookmarkProgress"></a-button>
    </a-tooltip>
    <a-tooltip v-else placement="bottom" :open="bookmarkTooltipVisible" :title="t('reader.bar.unbookmarked')">
      <a-button :icon="h(BookOutlined)" @click="bookmarkProgress"></a-button>
    </a-tooltip>
		<a-button-group>
    <a-button :icon="h(DownloadOutlined)" @click="saveAsEpub">{{ t('reader.bar.download-epub') }}</a-button>
			<a-button :icon="h(SendOutlined)" @click="sendToKindle">{{ t('reader.bar.send-to-kindle') }}</a-button>
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
