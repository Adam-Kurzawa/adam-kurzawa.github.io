<script setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation, useAsset, useLocale } from '@/utils/hooks'
import { ReadOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const router = useRouter()
const locale = useLocale()
const t = useTranslation()

const { useToken } = theme
const { token } = useToken()

const stories = ref([
    {
        cover: useAsset(import('@/assets/walhalla.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'walhalla'
    },
    {
        cover: useAsset(import('@/assets/laniakea.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'laniakea'
    },
    {
        cover: useAsset(import('@/assets/nowa_baśń.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'slavic'
    },
    {
        cover: useAsset(import('@/assets/pismo.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'script'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'solstice'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'timestar'
    },
    {
        cover: useAsset(import('@/assets/solstice.jpg')),
        title: 'w_drodze_do_walhalli',
        key: 'revelations'
    }
])

const openReader = (obj) => {
    router.push({
        name: 'reader',
        params: { lang: locale.value, title: obj.title },
        query: { type: 'fragment' },
    })
}
</script>

<template>
    <a-space direction="vertical" size="middle">
        <a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="title">{{ t('alternata-card.title') }}</a-typography-title>
        <div class="stories">
            <a-card :title="t('alternata-card.subtitle')" :style="{ gridArea: 'ad' }">
                <!-- Hack! Badge should be top level and contain a-card inside but it breaks grid! -->
                <a-badge-ribbon :text="t('alternata-card.launch')" color="volcano" :style="{ marginTop: '-4.75rem', marginRight: '-1.5rem', paddingRight: '1rem' }" ></a-badge-ribbon>
                <p class="justify">{{ t('alternata-card.text') }}</p>
            </a-card>
            <div v-for="story in stories" :style="{ gridArea: story.key, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }">
                <a-image :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px`, height: '100%', width: 'auto' }" :src="story.cover" />
                <a-card :title="t(`alternata-card.stories.${story.key}.title`)" :style="{ borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, height: '14rem', width: '100%' }" :bodyStyle="{ height: 'calc(14rem - 49px - 56px - 1px)', paddingTop: '0.75rem' }">
                    <p class="justify small-spacing">{{ t(`alternata-card.stories.${story.key}.description`) }}</p>
                    <template #actions>
                        <a-button type="text" size="small" :icon="h(ReadOutlined)" @click="() => openReader(story)">{{ t('alternata-card.read-more') }}</a-button>
                    </template>
                </a-card>
            </div>
        </div>
    </a-space>
</template>

<style scoped>
.stories {
    display: grid;
    grid-auto-rows: 14rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas:
        "ad ad walhalla"
        "laniakea slavic script"
        "solstice timestar revelations";
    gap: 1rem;
}

.small-spacing {
    line-height: 1.15rem;
}

@media screen and (max-width: 1800px) {
  .stories {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
        "ad walhalla"
        "laniakea slavic"
        "script solstice"
        "timestar revelations";
  }
}

@media screen and (max-width: 1440px) {
  .stories {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
        "ad"
        "walhalla"
        "laniakea"
        "slavic"
        "script"
        "solstice"
        "timestar"
        "revelations";
  }
}
</style>
