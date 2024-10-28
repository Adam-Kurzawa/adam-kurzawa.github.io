<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'colorful' ])

const themeStore = useThemeStore()
</script>

<template>
    <h2 class="h2" :class="[ props.colorful ? themeStore.secondaryColor : themeStore.primaryTextColor ]">{{ props.text }}</h2>
</template>

<style scoped>
.h2 {
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 1.5rem;
  margin: 0;
  transition: color 0.5s ease;
}
</style>