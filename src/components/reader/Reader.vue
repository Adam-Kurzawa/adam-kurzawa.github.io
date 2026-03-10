<script setup>
import ReaderBar from './ReaderBar.vue'
import ReaderComments from './ReaderComments.vue'
import ReaderDocument from './ReaderDocument.vue'
import ReaderChapters from './ReaderChapters.vue'
import { useToggle } from '@vueuse/core'
import { useFont } from '@/utils/useFont'
import ReaderPageNavigation from './ReaderPageNavigation.vue'

const props = defineProps([ 'metadata', 'htmlContent', 'htmlChapters', 'chapterNumber' ])

const [ font, setFontFamily, setFontSize ] = useFont()
const [ areCommentsVisible, toggleCommentsVisibility ] = useToggle()
const [ isChaptersMenuVisible, toggleChaptersMenuVisibility ] = useToggle()
</script>

<template>
    <ReaderComments :visible="areCommentsVisible"
                    @close-comments="toggleCommentsVisibility"
    />
    <ReaderChapters :visible="isChaptersMenuVisible"
                    :metadata="props.metadata" 
                    :chapter-number="props.chapterNumber"
                    @hide-chapters="toggleChaptersMenuVisibility"
    />
    <ReaderBar :html-content="props.htmlContent" 
               :html-chapters="props.htmlChapters"
               :chapter-number="props.chapterNumber"
               :metadata="props.metadata"
               :font="font"
               @set-font-family="setFontFamily"
               @show-comments="toggleCommentsVisibility"
               @show-chapters="toggleChaptersMenuVisibility"
               @increase-font-size="() => setFontSize(font.size.value + 0.25)" 
               @default-font-size="() => setFontSize(1.25)"
               @decrease-font-size="() => setFontSize(font.size.value - 0.25)"
    />
    <ReaderPageNavigation :chapter-number="props.chapterNumber"
                          :metadata="props.metadata"
    >
        <ReaderDocument :metadata="props.metadata"
                        :chapter-number="props.chapterNumber"
                        :html-chapters="props.htmlChapters"
                        :font="font"
        />
    </ReaderPageNavigation>
</template>

<style scoped>
</style>
