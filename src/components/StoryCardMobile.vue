<script setup>
import { useAsset, useInnerWidth, useLocale, useTranslation, useUrl } from '@/utils/hooks'
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import { countCharacters } from '@/utils/functions'
import { ReadOutlined, CustomerServiceOutlined } from '@ant-design/icons-vue'
import { useAudioStore } from '@/stores/audio'
import StoryCardShareButtons from './StoryCardShareButtons.vue'
import StoryCardDescriptions from './StoryCardDescriptions.vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'title' ])

const router = useRouter()
const locale = useLocale()
const url = useUrl()
const t = useTranslation()
const audioStore = useAudioStore()
const width = useInnerWidth()
const themeStore = useThemeStore()

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
</script>

<template>
    <a-card v-if="content" class="story-card" :class="`story-card-${themeStore.currentTheme}`">
        <div class="top-content">
            <div>
                <a-image v-if="width > 600" :src="imageSrc" :width="'10rem'" :style="[ isPending ? { filter: 'grayscale(100%)' } : { } ]" />
                <a-image v-else :src="imageSrc" :style="[ isPending ? { filter: 'grayscale(100%)' } : { } ]" />
            </div>
            <div class="top-left-content" v-if="isPublished">
                <a-typography-title :level="3" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
                <a-space>
                    <a-button type="primary" :icon="h(ReadOutlined)" @click="openReader">{{ t('story-card.read') }}</a-button>
                    <a-button v-if="youTubeVideoId" type="primary" :icon="h(CustomerServiceOutlined)" @click="listenTo">Słuchaj</a-button>
                    <StoryCardShareButtons :content="content" :locale="locale" :url="url" />
                </a-space>
                <StoryCardDescriptions v-if="isPublished" :locale="locale" :series="series" :year="year" :chapters="chapters" :characters-count="charactersCount" />
            </div>
            <div class="top-left-content" v-else>
                <a-typography-title :level="3" class="title">{{ title }}</a-typography-title>
                <div class="ribbon-alt">{{ t('story-card.pending') }}</div>
            </div>
        </div>
        <p class="justify desc">{{ description }}</p>
        <div class="tags">
            <a-tag v-for="tag in tags">{{ tag }}</a-tag>
        </div>
    </a-card>
</template>

<style scoped>
.story-card {
	transition: background-color 0.5s ease, border-color 1s ease, font-size 1s ease;
}

.story-card-light:hover {
	border-color: #4096ff;
	background-color: rgba(0, 0, 0, 0.05);
}

.story-card-dark:hover {
	border-color: #3c89e8;
	background-color: rgba(256, 256, 256, 0.05);
}

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

.desc {
    margin-top: 1rem;
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