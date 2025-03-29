<script setup>
import { useAsset, useLocale, useTranslation, useUrl } from '@/utils/hooks'
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { countCharacters } from '@/utils/functions'
import { EpubService } from '@/utils/EpubService.js'
import { ShareAltOutlined, ReadOutlined, SendOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { theme } from 'ant-design-vue'

const props = defineProps([ 'title', 'seriesFilter' ])

const router = useRouter()
const locale = useLocale()
const url = useUrl()
const t = useTranslation()

const { useToken } = theme
const { token } = useToken()

const kindleModalOpen = ref(false)
const sendingToKindle = ref(false)
const showSendingConfirmation = ref(false)
const sendToKindleButtonDisabled = ref(false)
const cancelSendingButtonDisabled = ref(false)
const okText = ref(t('story-card.send'))
const cancelText = ref(t('story-card.cancel'))
const kindleAddress = ref($cookies.get('kindle-address') ?? '')

const imageSrc = useAsset(import(`@/assets/story/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/story/${props.title}_${locale.value}.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const year = computed(() => content.value.year)
const chapters = computed(() => content.value.chapters.length)
const tags = computed(() => content.value.tags)
const series = computed(() => content.value.series)
const charactersCount = computed(() => countCharacters(content.value.chapters))

const saveAsEpub = () => EpubService.saveAsEpub(title.value, content.value.chapters, t("reader.epub-chapter"), content.value.chapterTitles)

const sendToKindle = (to) => EpubService.sendAsEpub(title.value, content.value.chapters, t("reader.epub-chapter"), content.value.chapterTitles, to)

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

const filterBySeries = () => {
    router.push({
        name: 'stories',
        params: { lang: locale.value },
        query: { series: series.value },
    })
}

const handleSendingToKindle = () => {
    sendingToKindle.value = true
    cancelSendingButtonDisabled.value = true
    okText.value = t('story-card.sending')
    const address = `${kindleAddress.value}@kindle.com`
    $cookies.set('kindle-address', kindleAddress.value)

    sendToKindle(address).then(x => {
        showSendingConfirmation.value = true
        okText.value = t('story-card.send')
        cancelText.value = t('story-card.close')
        sendingToKindle.value = false
        sendToKindleButtonDisabled.value = true
        cancelSendingButtonDisabled.value = false

        setTimeout(() => {
            kindleModalOpen.value = false
            sendToKindleButtonDisabled.value = false
            showSendingConfirmation.value = false
        }, 2000);
    })
}

const showSendToKindleModal = () => {
    kindleModalOpen.value = true
};
</script>

<template>
    <div class="story-card" v-if="content && (seriesFilter ? series === seriesFilter : true)">
        <a-image :src="imageSrc" :width="'14rem'" :style="{ borderTopLeftRadius: `${token.borderRadiusLG}px`, borderBottomLeftRadius: `${token.borderRadiusLG}px` }" />
        <a-card :style="{ flex: '1', borderTopLeftRadius: `0`, borderBottomLeftRadius: `0`, maxHeight: '21rem', height: '21rem', minHeight: '21rem', overflowY: 'clip' }">
            <template #extra>
                <a-space>
                    <a-button type="primary" :icon="h(ReadOutlined)" @click="openReader">{{ t('story-card.read') }}</a-button>
                    <a-button-group>
                        <a-button @click="saveAsEpub">
                            <template #icon>
                                <DownloadOutlined />
                            </template>
                        </a-button>
                        <a-button @click="showSendToKindleModal">
                            <template #icon>
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
            </template>
            <template #title>
                <a-typography-title :level="3" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
                <a-modal v-model:open="kindleModalOpen" :title="t('story-card.send-to-kindle')" :okText="okText" :cancelText="cancelText" :ok-button-props="{ disabled: sendToKindleButtonDisabled }" :cancel-button-props="{ disabled: cancelSendingButtonDisabled }" :confirm-loading="sendingToKindle" @ok="handleSendingToKindle">
                    <div v-if="showSendingConfirmation" class="success">
                        <img src="/success.png" />
                        <a-typography-text strong>Wysłano plik!</a-typography-text>
                    </div>
                    <div v-else>
                        <p>Aby wysłać plik na swoje urządzenie Kindle musisz:</p>
                        <p>a) podać adres email swojej skrzynki Kindle,</p>
                        <p>b) wpisać mój adres email (adam.kurzawa.70@gmail.com) jako zaufany adres na stronie Amazonu</p>
                        <a-input v-model:value="kindleAddress" addon-after="@kindle.com" />
                    </div>
                </a-modal>
            </template>
            <div class="content">
                <div class="descriptions">
                    <div class="tags">
                        <a-tag v-for="tag in tags">{{ tag }}</a-tag>
                    </div>
                    <p class="justify" :style="{ flex: '1' }">{{ description }}</p>
                </div>
                <a-descriptions class="table" bordered size="small" :column="1">
                    <a-descriptions-item :label="t('story-card.series-column')" v-if="series !== null">
                        <a-button type="link" size="small" @click="filterBySeries" :style="{ padding: '0', border: 'none' }">{{ series }}</a-button>
                    </a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.year-column')">{{ year }}</a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.chapters-column')">{{ chapters }}</a-descriptions-item>
                    <a-descriptions-item :label="t('story-card.characters-column')">{{ charactersCount }}</a-descriptions-item>
                </a-descriptions>
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

.descriptions {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 1rem;
    flex: 1;
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
    width: 20rem;
    max-width: 20rem;
}

.success {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;
}

.success > img {
    width: 5rem;
    height: auto;
}

@media screen and (max-width: 1280px) {
    .table {
        min-width: 14rem;
        width: 14rem;
        max-width: 14rem;
    }
}

@media screen and (max-width: 1024px) {
    .table {
        min-width: 14rem;
        width: 14rem;
        max-width: 14rem;
    }
}
</style>