<script setup>
import { ref } from 'vue'
import ReaderBar from './ReaderBar.vue'
import ReaderComments from './ReaderComments.vue'
import ReaderDocument from './ReaderDocument.vue'

const props = defineProps([ 'story', 'chapter' ])

const fontSize = ref(parseFloat($cookies.get('font-size') ?? '1.25'))
const fontFamily = ref($cookies.get('font-family') ?? 'Times New Roman')

const setFontSize = (size) => {
  $cookies.set('font-size', size)
  fontSize.value = size 
}

const setFontFamily = (font) => {
  $cookies.set('font-family', font)
  fontFamily.value = font
}

const areCommentsVisible = ref(false)
const closeComments = () => { areCommentsVisible.value = false }
const showComments = () => { areCommentsVisible.value = true }
</script>

<template>
  <div>
    <ReaderComments :visible="areCommentsVisible"
                    @close-comments="closeComments"
    />
    <ReaderBar :story="props.story" 
               :chapter="props.chapter"
               :font-size="fontSize"
               :font-family="fontFamily"
               @set-font-family="setFontFamily"
               @show-comments="showComments"
               @increase-font-size="() => setFontSize(fontSize + 0.25)" 
               @default-font-size="() => setFontSize(1.25)"
               @decrease-font-size="() => setFontSize(fontSize - 0.25)"
    />
    <ReaderDocument :story="props.story"
                    :chapter="props.chapter"
                    :font-size="fontSize"
                    :font-family="fontFamily"
    />
  </div>
</template>

<style scoped>
</style>
