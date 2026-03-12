<script setup>
import { useRouter } from 'vue-router'
import { useAudioStore } from '@/stores/audio'
import StoryThumbnail from './StoryThumbnail.vue'
import { useStaticAsset } from '@/utils/useStaticAsset'
import { numberify } from '@/utils/numberify'

const props = defineProps([ 'metadata' ])

const router = useRouter()
const audioStore = useAudioStore()
const imageSrc = useStaticAsset(`${props.metadata.documentId}.jpg`)

const openReader = () => {
    router.push({
        name: 'reader',
        params: { title: props.metadata.documentId, type: 'story' }
    })
}

const listenTo = () => {
    audioStore.setAudioBook(props.metadata.youTubeVideoId, props.metadata.series, imageSrc)
}
</script>

<template>
    <StoryThumbnail :title="props.metadata.title" 
                    :img="imageSrc"
                    :publication-date="props.metadata.publicationDate" 
                    :description="props.metadata.description" 
                    :audio="props.metadata.youTubeVideoId" 
                    :series="props.metadata.series"
                    :tags="props.metadata.tags"
                    :chapters-count="props.metadata.chaptersCount"
                    :characters-count="numberify(Number(props.metadata.charactersCount))"
                    @read="openReader"
                    @listen-to="listenTo"
    />
</template>
