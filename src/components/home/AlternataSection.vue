<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '@/utils/hooks'
import HighlightedTag from './../system/HighlightedTag.vue'
import AlternataThumbnail from '../thumbnails/AlternataThumbnail.vue'
import ViewHeader from '../system/ViewHeader.vue'
import { useStaticAsset } from '@/utils/useStaticAsset'

const router = useRouter()
const t = useTranslation()

const stories = ref([
    {
        cover: useStaticAsset('walhalla.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'walhalla'
    },
    {
        cover: useStaticAsset('laniakea.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'laniakea'
    },
    {
        cover: useStaticAsset('nowa_baśń.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'slavic'
    },
    {
        cover: useStaticAsset('pismo.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'script'
    },
    {
        cover: useStaticAsset('solstice.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'solstice'
    },
    {
        cover: useStaticAsset('timestar.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'timestar'
    },
    {
        cover: useStaticAsset('revelations.jpg'),
        title: 'w_drodze_do_walhalli',
        key: 'revelations'
    }
])

const openReader = (obj) => {
    router.push({
        name: 'reader',
        params: { title: obj.title },
        query: { type: 'fragment' },
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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AlternataThumbnail v-for="story in stories" :key="story.key" :title="t(`alternata-card.stories.${story.key}.title`)" :img="story.cover" :description="t(`alternata-card.stories.${story.key}.description`)" />
            </div>
        </div>
    </section>
</template>
