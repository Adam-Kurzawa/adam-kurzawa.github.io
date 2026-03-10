<script setup>
import { useAsset } from '@/utils/useAsset'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAudioStore } from '@/stores/audio'
import StoryThumbnail from './StoryThumbnail.vue'
import { useStaticAsset } from '@/utils/useStaticAsset'

const props = defineProps([ 'title' ])

const router = useRouter()
const audioStore = useAudioStore()

const imageSrc = useStaticAsset(`${props.title}.jpg`)
const content = useAsset(import(`@/assets/story/${props.title}_pl.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const year = computed(() => content.value.year)
const chapters = computed(() => content.value.chapters.length)
const tags = computed(() => content.value.tags)
const series = computed(() => content.value.series)
const charactersCount = computed(() => 0)
const youTubeVideoId = computed(() => content.value.youTubeVideoId)
const isPending = computed(() => content.value.status === 'PENDING')
const isPublished = computed(() => content.value.status === 'PUBLISHED')

const openReader = () => {
    router.push({
        name: 'reader',
        params: { title: props.title, type: 'story' }
    })
}

const listenTo = () => {
    audioStore.setAudioBook(youTubeVideoId.value, series.value, imageSrc.value)
}
</script>

<template>
    <StoryThumbnail 
        v-if="content"
        :title="title" 
        :img="imageSrc"
        :publication-date="year" 
        :description="description" 
        :audio="youTubeVideoId" 
        :series="series"
        :tags="tags"
        :chapters-count="chapters"
        :characters-count="charactersCount"
        @read="openReader"
        @listen-to="listenTo"
    />
</template>
