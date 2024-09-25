<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div class="white-panel" :class="themeStore.borderColor">
    <slot></slot>
  </div>
</template>

<style scoped>
.white-panel {
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;
}

@media screen and (max-width: 1600px) {
  .white-panel {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media screen and (max-width: 1280px) {
  .white-panel {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>