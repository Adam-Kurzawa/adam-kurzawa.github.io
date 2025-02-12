<script setup>
import { h, ref } from 'vue'
import { useTranslation, useAsset } from '@/utils/hooks'
import { ReadOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const t = useTranslation()

const { useToken } = theme
const { token } = useToken()

const stories = ref([
    {
        cover: useAsset(import('@/assets/laniakea.jpg')),
        key: 'walhalla'
    },
    {
        cover: useAsset(import('@/assets/laniakea.jpg')),
        key: 'laniakea'
    },
    {
        cover: useAsset(import('@/assets/nowa_baśń.jpg')),
        key: 'slavic'
    },
    {
        cover: useAsset(import('@/assets/pismo.jpg')),
        key: 'script'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        key: 'solstice'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        key: 'timestar'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        key: 'revelations'
    }
])
</script>

<template>
    <a-space direction="vertical" size="middle">
        <a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="title">{{ t('alternata-card.title') }}</a-typography-title>
        <div class="stories">
            <a-card :title="t('alternata-card.subtitle')" :style="{ gridArea: 'ad' }">
                <!-- Hack! Badge should be top level and contain a-card inside but it breaks grid! -->
                <a-badge-ribbon :text="t('alternata-card.launch')" color="volcano" :style="{ marginTop: '-4.75rem', marginRight: '-1.5rem' }" ></a-badge-ribbon>
                <p>{{ t('alternata-card.text') }}</p>
            </a-card>
            <div v-for="story in stories" :style="{ gridArea: story.key, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }">
                <a-image :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px`, height: '100%', width: 'auto' }" :src="story.cover" />
                <a-card :title="t(`alternata-card.stories.${story.key}.title`)" :style="{ borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, height: '14rem', width: '100%' }" :bodyStyle="{ height: 'calc(14rem - 49px - 56px - 1px)' }">
                    <p>{{ t(`alternata-card.stories.${story.key}.description`) }}</p>
                    <template #actions>
                        <a-button type="text" size="small" :icon="h(ReadOutlined)">{{ t('alternata-card.read-more') }}</a-button>
                    </template>
                </a-card>
            </div>
        </div>
    </a-space>
</template>

<style scoped>
.stories {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: 14rem;
    grid-template-areas:
        "ad ad walhalla"
        "laniakea slavic script"
        "solstice timestar revelations";
    gap: 1rem;
}
</style>
