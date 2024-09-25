<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'colorful' ])

const themeStore = useThemeStore()
</script>

<template>
    <h1 class="h1" :class="[ props.colorful ? themeStore.primaryColor : themeStore.primaryTextColor ]">{{ props.text }}</h1>
</template>

<style scoped>
.h1 {
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 2rem;
  margin: 0;
  transition: color 0.5s ease;
}
</style>