<script setup>
import { ref } from 'vue'
import ReaderBar from './ReaderBar.vue'
import ReaderComments from './ReaderComments.vue'
import ReaderDocument from './ReaderDocument.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import ReaderChapters from './ReaderChapters.vue'

const props = defineProps([ 'story', 'chapter' ])

const cookies = useCookies()

const fontSize = ref(parseFloat(cookies.get('font-size') ?? '1.25'))
const fontFamily = ref(cookies.get('font-family') ?? 'Times New Roman')

const setFontSize = (size) => {
  const normalizedSize = Math.max(0.25, size)
  cookies.set('font-size', normalizedSize)
  fontSize.value = normalizedSize 
}

const setFontFamily = (font) => {
  cookies.set('font-family', font)
  fontFamily.value = font
}

const areCommentsVisible = ref(false)
const closeComments = () => { areCommentsVisible.value = false }
const showComments = () => { areCommentsVisible.value = true }

const isChaptersMenuVisible = ref(false)
const hideChaptersMenu = () => { isChaptersMenuVisible.value = false }
const showChaptersMenu = () => { isChaptersMenuVisible.value = true }
</script>

<template>
  <ReaderComments :visible="areCommentsVisible"
                  @close-comments="closeComments"
  />
  <ReaderChapters :visible="isChaptersMenuVisible"
                  :story="props.story" 
                  :chapter="props.chapter"
                  @hide-chapters="hideChaptersMenu"
  />
  <ReaderBar :story="props.story" 
             :chapter="props.chapter"
             :font-size="fontSize"
             :font-family="fontFamily"
             @set-font-family="setFontFamily"
             @show-comments="showComments"
             @show-chapters="showChaptersMenu"
             @increase-font-size="() => setFontSize(fontSize + 0.25)" 
             @default-font-size="() => setFontSize(1.25)"
             @decrease-font-size="() => setFontSize(fontSize - 0.25)"
  />
  <ReaderDocument :story="props.story"
                  :chapter="props.chapter"
                  :font-size="fontSize"
                  :font-family="fontFamily"
  />
</template>

<style scoped>
</style>
