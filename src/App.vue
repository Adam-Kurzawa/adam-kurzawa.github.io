<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Copyrights from './components/Copyrights.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="content" :class="themeStore.primaryBackgroundColor">
    <RouterView :key="$route.fullPath"/>  
  </div>
  <footer>
    <Copyrights />
  </footer>
</template>

<style scoped>
.content {
  transition: padding 0.5s ease, background-color 0.5s ease;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 2300px) {
  .content {
    padding-left: 10%;
    padding-right: 10%;
  }
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
    margin-top: 5rem;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>