<script setup>
import { EpubService } from '@/utils/EpubService.js'
import { useTranslation } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'
import TextButton from '@/components/buttons/TextButton.vue'
import ButtonGroup from '@/components/buttons/ButtonGroup.vue'

const props = defineProps([ 'fontSize', 'fontFamily', 'story' ])

const t = useTranslation()
const themeStore = useThemeStore()

const saveAsEpub = () => EpubService.saveAsEpub(props.story.title, props.story.chapters, t("reader.epub-chapter"), props.story.chapterTitles)
const sendToKindle = () => { console.log("Sent to Kindle!") }
const share = () => { console.log("Shared!") }
</script>

<template>
  <div class="floating-bar" :class="[themeStore.primaryBackgroundColor, themeStore.borderColor]">
    <ButtonGroup>
      <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="saveAsEpub">Pobierz ePUB</button>
      <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="sendToKindle">{{ t("reader.sendToKindle") }}</button>
      <button href="#" class="font-segoe" :class="themeStore.primaryTextColor" @click="share">Udostępnij</button>
    </ButtonGroup>
    <ButtonGroup>
      <select :class="themeStore.primaryTextColor" v-model="props.fontFamily" @change="(event) => $emit('set-font-family', event)">
        <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Times New Roman';">Times New Roman</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: Georgia;">Georgia</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: Arial;">Arial</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: Verdana;">Verdana</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Segoe UI';">Segoe UI</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Josefin Sans';">Josefin Sans</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Yeseva One';">Yeseva One</option>
        <option :class="themeStore.primaryBackgroundColor" style="font-family: 'Madimi One';">Madimi One</option>
      </select>
    </ButtonGroup>
    <ButtonGroup>
      <span :class="themeStore.primaryTextColor">{{ props.fontSize * 10 }}</span>
      <button @click="$emit('increase-font-size')" :class="themeStore.primaryTextColor">+</button>
      <button @click="$emit('default-font-size')" :class="themeStore.primaryTextColor">100%</button>
      <button @click="$emit('decrease-font-size')" :class="themeStore.primaryTextColor">-</button>
    </ButtonGroup>
    <TextButton text="Komentarze" :action="() => $emit('show-comments')" />
  </div>
</template>

<style scoped>
.floating-bar {
  display: flex;
  gap: 2rem;
  justify-content: center;
  transition: background 0.5s ease, padding 0.5s ease;
  position: fixed;
  top: 5.5rem;
  left: 0;
  width: 100%;
  z-index: 100;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

@media screen and (max-width: 1600px) {
  .floating-bar {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media screen and (max-width: 1440px) {
  .floating-bar {
    gap: 1rem;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1280px) {
  .floating-bar {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
