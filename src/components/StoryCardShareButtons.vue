<script setup>
import { useTranslation } from '@/utils/hooks'
import { ref } from 'vue'
import { EpubService } from '@/utils/EpubService.js'
import { ShareAltOutlined, SendOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import SendToKindle from './SendToKindle.vue'

const props = defineProps([ 'content', 'locale', 'url' ])

const t = useTranslation()

const kindleModalOpen = ref(false)

const saveAsEpub = () => 
    EpubService.saveAsEpub(
        props.content.title, 
        props.content.chapters,
        t("reader.epub-chapter"), 
        props.content.chapterTitles, 
        props.content.tags, 
        props.locale
    )

const share = () => { 
    navigator.share({
        url: props.url,
        title: props.content.title,
        text: 'Alternata - personal blog by Adam Kurzawa'
    })
}

const showSendToKindleModal = () => {
    kindleModalOpen.value = true
}

const hideSendToKindleModal = () => {
    kindleModalOpen.value = false
}
</script>

<template>
    <a-button-group>
        <a-button @click="saveAsEpub">
            <template #icon>
                <DownloadOutlined />
            </template>
        </a-button>
        <a-button @click="showSendToKindleModal">
            <template #icon>
                <SendToKindle :story="content" :visible="kindleModalOpen" @hide="hideSendToKindleModal" />
                <SendOutlined />
            </template>
        </a-button>
        <a-button @click="share">
            <template #icon>
                <ShareAltOutlined />
            </template>
        </a-button>
    </a-button-group>
</template>
