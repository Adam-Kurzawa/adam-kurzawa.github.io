<script setup>
import { useAsset, useLocale, useTranslation, useUrl } from '@/utils/hooks'
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import { countCharacters } from '@/utils/functions'
import { ReadOutlined, CustomerServiceOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'
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
const themeStore = useThemeStore()

const { useToken } = theme
const { token } = useToken()

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
    <div v-if="content" class="story-card" :class="`story-card-${themeStore.currentTheme}`">
        <a-image :src="imageSrc" :width="'14rem'" :style="[ { borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px` }, isPending ? { filter: 'grayscale(100%)' } : { } ]" />
        <a-card class="story-card-internal" :style="{ flex: '1', borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, maxHeight: '21rem', height: '21rem', minHeight: '21rem', overflowY: 'clip' }">
            <template #extra>
                <a-space v-if="isPublished">
                    <a-button type="primary" :icon="h(ReadOutlined)" @click="openReader">{{ t('story-card.read') }}</a-button>
                    <a-button v-if="youTubeVideoId" type="primary" :icon="h(CustomerServiceOutlined)" @click="listenTo">Słuchaj</a-button>
                    <StoryCardShareButtons :content="content" :locale="locale" :url="url" />
                </a-space>
            </template>
            <template #title>
                <a-typography-title v-if="isPublished" :level="3" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
                <a-typography-title v-else :level="3" class="title">{{ title }}</a-typography-title>
            </template>
            <a-badge-ribbon v-if="isPending" :text="t('story-card.pending')" color="volcano" :style="{ marginTop: '-4.75rem', marginRight: '-1.5rem', paddingRight: '1rem' }" ></a-badge-ribbon>
            <div class="content">
                <div class="descriptions">
                    <div class="tags">
                        <a-tag v-for="tag in tags">{{ tag }}</a-tag>
                    </div>
                    <p class="justify desc" :style="{ flex: '1' }">{{ description }}</p>
                </div>
                <StoryCardDescriptions v-if="isPublished" :locale="locale" :series="series" :year="year" :chapters="chapters" :characters-count="charactersCount" />
            </div>
        </a-card>
    </div>
</template>

<style scoped>
.story-card {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.story-card-internal {
	transition: background-color 0.5s ease, border-color 1s ease, font-size 1s ease;
}

.story-card-light:hover > .story-card-internal {
	border-color: #4096ff;
	background-color: rgba(0, 0, 0, 0.05);
}

.story-card-dark:hover > .story-card-internal {
	border-color: #3c89e8;
	background-color: rgba(256, 256, 256, 0.05);
}

.content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 2rem;
    justify-content: space-between;
}

.desc {
    margin-top: 1rem;
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
</style>