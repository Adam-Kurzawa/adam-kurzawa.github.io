<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Copyrights from './components/Copyrights.vue'
import { useThemeStore } from './stores/theme'
import { ref } from 'vue'
import WorkInProgress from './components/WorkInProgress.vue'

const themeStore = useThemeStore()

const hideContent = ref(import.meta.env.VITE_HIDE_CONTENT === 'true')
</script>

<template>
  <a-config-provider :theme="{ algorithm: themeStore.themeAlgorithm }">
    <header>
      <Navbar />
    </header>
    <div class="content" :class="themeStore.primaryBackgroundColor">
      <WorkInProgress v-if="hideContent" />
      <RouterView v-else :key="$route.fullPath"/>  
    </div>
    <footer>
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

@media screen and (max-width: 1280px) {
  .content {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 1024px) {
  .content {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>