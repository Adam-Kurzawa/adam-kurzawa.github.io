<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Copyrights from './components/footer/Copyrights.vue'
import { useThemeStore } from './stores/theme'
import { computed } from 'vue'
import WorkInProgress from './components/WorkInProgress.vue'
import AudioPlayer from './components/player/AudioPlayer.vue'
import Feeds from './components/footer/Feeds.vue'
import CookieConsent from './components/CookieConsent.vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import Notifications from './components/Notifications.vue'
import Gallery from './components/Gallery.vue'

const cookies = useCookies()
const themeStore = useThemeStore()

const hideContent = computed(() => import.meta.env.VITE_HIDE_CONTENT === 'true')
const showAudioPlayer = computed(() => import.meta.env.VITE_SHOW_AUDIO_PLAYER === 'true')
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white dark:bg-slate-950 h-28">
    <Navbar />
  </header>
  <div :class="themeStore.primaryBackgroundColor">
    <CookieConsent />
    <Notifications />
    <Gallery />
    <AudioPlayer v-if="showAudioPlayer"/>
    <WorkInProgress v-if="hideContent" />
    <RouterView v-else :key="$route.fullPath"/>  
  </div>
  <footer class="bg-slate-50 py-20 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-6">
      <Feeds />
      <Copyrights />
    </div>
  </footer>
</template>
