<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/utils/useTranslation'
import HighlightedTag from './../system/HighlightedTag.vue'
import AlternataThumbnail from '../thumbnails/AlternataThumbnail.vue'
import ViewHeader from '../system/ViewHeader.vue'
import { useStaticAsset } from '@/utils/useStaticAsset'

const router = useRouter()
const t = useTranslation()

const stories = ref([
    {
        cover: useStaticAsset('walhalla.jpg'),
        key: 'walhalla'
    },
    {
        cover: useStaticAsset('laniakea.jpg'),
        key: 'laniakea'
    },
    {
        cover: useStaticAsset('nowa_baśń.jpg'),
        key: 'slavic'
    },
    {
        cover: useStaticAsset('pismo.jpg'),
        key: 'script'
    },
    {
        cover: useStaticAsset('solstice.jpg'),
        key: 'solstice'
    },
    {
        cover: useStaticAsset('timestar.jpg'),
        key: 'timestar'
    },
    {
        cover: useStaticAsset('revelations.jpg'),
        key: 'revelations'
    },
    {
        cover: useStaticAsset('timestar.jpg'),
        key: 'dinoverse'
    }
])

const openReader = (obj) => {
    router.push({
        name: 'reader',
        params: { title: obj.key, type: 'fragment' }
    })
}
</script>

<template>
    <section class="bg-slate-50 py-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="mb-16">
                <div class="flex items-center gap-3 mb-4">
                    <HighlightedTag :value="t('alternata-card.launch')" />
                </div>
                <ViewHeader :title="t('alternata-card.title')" :description="t('alternata-card.text')" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AlternataThumbnail v-for="story in stories" :key="story.key" @click="openReader(story)" :title="t(`alternata-card.stories.${story.key}.title`)" :img="story.cover" :description="t(`alternata-card.stories.${story.key}.description`)" />
            </div>
        </div>
    </section>
</template>
