<script setup>
import { useAsset, useLocale, useTranslation, useUrl } from '@/utils/hooks'
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { countCharacters } from '@/utils/functions'
import { EpubService } from '@/utils/EpubService.js'
import { ShareAltOutlined, ReadOutlined, SendOutlined, DownloadOutlined, CustomerServiceOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
import SendToKindle from './SendToKindle.vue'
import { useAudioStore } from '@/stores/audio'

const props = defineProps([ 'title' ])

const router = useRouter()
const locale = useLocale()
const url = useUrl()
const t = useTranslation()
const audioStore = useAudioStore()

const { useToken } = theme
const { token } = useToken()

const kindleModalOpen = ref(false)

const imageSrc = useAsset(import(`@/assets/story/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/story/${props.title}_${locale.value}.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const year = computed(() => content.value.year)
const chapters = computed(() => content.value.chapters.length)
const tags = computed(() => content.value.tags)
const series = computed(() => content.value.series)
const charactersCount = computed(() => countCharacters(content.value.chapters))
const youTubeVideoId = computed(() => content.value.youTubeVideoId)
const isPending = computed(() => content.value.status === 'PENDING')
const isPublished = computed(() => content.value.status === 'PUBLISHED')

const saveAsEpub = () => EpubService.saveAsEpub(title.value, content.value.chapters, t("reader.epub-chapter"), content.value.chapterTitles, content.value.tags, locale.value)

const share = () => { 
    navigator.share({
        url: url.value,
        title: title.value,
        text: 'Alternata - personal blog by Adam Kurzawa'
    })
}

const openReader = () => {
    router.push({
        name: 'reader',
        params: { lang: locale.value, title: props.title },
        query: { type: 'story' },
    })
}

const listenTo = () => {
    audioStore.setAudioBook(youTubeVideoId.value, series.value)
}

const filterBySeries = () => {
    router.push({
        name: 'stories',
        params: { lang: locale.value },
        query: { series: series.value },
    })
}

const showSendToKindleModal = () => {
    kindleModalOpen.value = true
}

const hideSendToKindleModal = () => {
    kindleModalOpen.value = false
}
</script>

<template>
    <a-card v-if="content">
        <div class="top-content">
            <div>
                <a-image :src="imageSrc" :width="'10rem'" :style="[ isPending ? { filter: 'grayscale(100%)' } : { } ]" />
            </div>
            <div class="top-left-content" v-if="isPublished">
                <a-typography-title :level="3" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
                <a-space>
                    <a-button type="primary" :icon="h(ReadOutlined)" @click="openReader">{{ t('story-card.read') }}</a-button>
                    <a-button v-if="youTubeVideoId" type="primary" :icon="h(CustomerServiceOutlined)" @click="listenTo">Słuchaj</a-button>
                    <a-button-group>
                        <a-button @click="saveAsEpub">
                            <template #icon>
                                <DownloadOutlined />
                            </template>
                        </a-button>
                        <a-button @click="showSendToKindleModal">
                            <template #icon>
                                <SendToKindle :story="content" :visible="kindleModalOpen" @hide="hideSendToKindleModal" />
                                <SendOutlined />
                            </template>
                        </a-button>
                        <a-button @click="share">
                            <template #icon>
                                <ShareAltOutlined />
                            </template>
                        </a-button>
                    </a-button-group>
                </a-space>
                <a-descriptions class="table" bordered size="small" :column="1">
                    <a-descriptions-item :label="t('story-card.series-column')" v-if="series !== null">
                        <a-button type="link" size="small" @click="filterBySeries" :style="{ padding: '0', border: 'none' }">{{ series }}</a-button>
                    </a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.year-column')">{{ year }}</a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.chapters-column')">{{ chapters }}</a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.characters-column')">{{ charactersCount }}</a-descriptions-item>
                    <a-descriptions-item :label="'Tags'">
                        <div class="tags">
                            <a-tag v-for="tag in tags">{{ tag }}</a-tag>
                        </div>
                    </a-descriptions-item>
                </a-descriptions>
            </div>
            <div class="top-left-content" v-else>
                <a-typography-title :level="3" class="title">{{ title }}</a-typography-title>
                <div class="ribbon-alt">{{ t('story-card.pending') }}</div>
            </div>
        </div>
        <p class="justify desc">{{ description }}</p>
    </a-card>
</template>

<style scoped>
.top-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    max-width: 100%;
    gap: 1rem;
}

.top-left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.story-card {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.descriptions {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 1rem;
    flex: 1;
}

.ribbon-alt {
    background-color: #fa541c;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: white;
    font-weight: 500;
    text-align: center;
    border-radius: 0.35rem;
    margin-bottom: 1rem;
}

.content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;
}

.title {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-top: 0.75rem;
    cursor: pointer;
    width: fit-content;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 0.5rem;
}

.table {
    min-width: 20rem;
    width: 100%;
}

.desc {
    padding: 1rem;
}

.top-left-content > h3 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

@media screen and (max-width: 600px) {
  .top-content {
    flex-direction: column;
  }
}
</style>