<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Copyrights from './components/Copyrights.vue'
import { useThemeStore } from './stores/theme'
import { computed } from 'vue'
import WorkInProgress from './components/WorkInProgress.vue'
import AudioPlayer from './components/player/AudioPlayer.vue'
import Feeds from './components/Feeds.vue'

const themeStore = useThemeStore()

const hideContent = computed(() => import.meta.env.VITE_HIDE_CONTENT === 'true')
const showAudioPlayer = computed(() => import.meta.env.VITE_SHOW_AUDIO_PLAYER === 'true')
</script>

<template>
  <a-config-provider :theme="{ algorithm: themeStore.themeAlgorithm }">
    <header>
      <Navbar />
    </header>
    <div class="content" :class="themeStore.primaryBackgroundColor">
      <AudioPlayer v-if="showAudioPlayer"/>
      <WorkInProgress v-if="hideContent" />
      <RouterView v-else :key="$route.fullPath"/>  
    </div>
    <footer>
      <Feeds />
      <Copyrights />
    </footer>
  </a-config-provider>
</template>

<style scoped>
.content {
  transition: padding 0.5s ease, background-color 0.5s ease;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 12rem;
  padding-right: 12rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.content > main {
  width: 100%;
}

@media screen and (max-width: 1920px) {
  .content {
    padding-left: 8rem;
    padding-right: 8rem;
  }
}

@media screen and (max-width: 1600px) {
  .content {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}

@media screen and (max-width: 1366px) {
  .content {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 1024px) {
  .content {
    padding-top: 6rem;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>