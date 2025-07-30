<script setup>
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation, useAsset, useLocale, useInnerWidth } from '@/utils/hooks'
import { ReadOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const router = useRouter()
const locale = useLocale()
const t = useTranslation()
const width = useInnerWidth()

const { useToken } = theme
const { token } = useToken()

const stories = ref([
    {
        cover: '/walhalla.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'walhalla'
    },
    {
        cover: '/laniakea.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'laniakea'
    },
    {
        cover: '/nowa_baśń.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'slavic'
    },
    {
        cover: '/pismo.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'script'
    },
    {
        cover: '/solstice.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'solstice'
    },
    {
        cover: '/timestar.jpg',
        title: 'w_drodze_do_walhalli',
        key: 'timestar'
    },
    {
        cover: '/revelations.jpg',
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
                <a-badge-ribbon v-if="width > 1024" :text="t('alternata-card.launch')" color="volcano" :style="{ marginTop: '-4.75rem', marginRight: '-1.5rem', paddingRight: '1rem' }" ></a-badge-ribbon>
                <div class="ribbon-alt" v-else>{{ t('alternata-card.launch') }}</div>
                <p class="justify">{{ t('alternata-card.text') }}</p>
            </a-card>
            <div v-if="width > 600" v-for="story in stories" :style="{ gridArea: story.key, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }">
                <a-image v-if="width > 1440" :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px`, height: '100%', width: 'auto' }" :src="story.cover" />
                <a-image v-else :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px`, height: '14rem', width: 'auto' }" :src="story.cover" />
                <a-card :title="t(`alternata-card.stories.${story.key}.title`)" :style="{ borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderBottomLeftRadius: `0`, height: '14rem', width: '100%' }" :bodyStyle="{ height: 'calc(14rem - 49px - 56px - 1px)', paddingTop: '0.75rem' }">
                    <p class="justify small-spacing">{{ t(`alternata-card.stories.${story.key}.description`) }}</p>
                    <template #actions>
                        <a-button type="text" size="small" :icon="h(ReadOutlined)" @click="() => openReader(story)">{{ t('alternata-card.read-more') }}</a-button>
                    </template>
                </a-card>
            </div>
            <div v-else v-for="story in stories">
                <div :style="{ gridArea: story.key, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }">
                    <a-image :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, height: '10rem', width: 'auto' }" :src="story.cover" />
                    <a-card :title="t(`alternata-card.stories.${story.key}.title`)" :style="{ borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, borderBottomRightRadius: `0`, height: '10rem', width: '100%' }" :bodyStyle="{ height: 'calc(10rem - 49px - 56px - 1px)', paddingTop: '0.75rem' }">
                        <template #actions>
                            <a-button type="text" size="small" :icon="h(ReadOutlined)" @click="() => openReader(story)">{{ t('alternata-card.read-more') }}</a-button>
                        </template>
                    </a-card>
                </div>
                <a-card :style="{ borderTopRightRadius: `0`, borderTopColor: 'transparent', borderTopLeftRadius: `0`, width: '100%' }">
                    <p class="justify small-spacing">{{ t(`alternata-card.stories.${story.key}.description`) }}</p>
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

.title-alt {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.title-alt-right {
    padding-left: 1rem;
}

.title-alt-text {
    margin-bottom: 1rem;
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
        display: flex;
        flex-direction: column;
    }
}
</style>
