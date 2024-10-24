<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'action' ])
const themeStore = useThemeStore()
</script>

<template>
    <div class="text-button font-segoe" :class="[themeStore.buttonFillColor, themeStore.buttonTextColor]" @click="props.action">{{ props.text }}</div>
</template>

<style scoped>
.text-button {
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: fit-content;
  font-weight: lighter;
  cursor: pointer;
}

.text-button:hover {
  background-color: darkgoldenrod;
}
</style>