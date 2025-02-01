<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'url', 'action' ]);

const themeStore = useThemeStore()
</script>

<template>
  <a class="link-button font-segoe" :class="themeStore.primaryLinkColor" :href="props.url" target="_blank">{{ props.text }} ➤</a>
</template>

<style scoped>
.link-button {
  font-size: 0.90rem;
  letter-spacing: 0.025rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.5s ease;
  text-decoration: none;
}

.link-button:hover {
  color: darkgoldenrod;
}
</style>
