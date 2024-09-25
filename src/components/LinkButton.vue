<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text' ]);

const themeStore = useThemeStore()
</script>

<template>
  <div class="link-button font-segoe" :class="themeStore.primaryLinkColor">{{ props.text }} ↦</div>
</template>

<style scoped>
.link-button {
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.5s ease;
}

.link-button:hover {
  color: darkgoldenrod;
}
</style>
