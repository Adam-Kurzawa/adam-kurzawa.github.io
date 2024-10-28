<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'colorful' ])

const themeStore = useThemeStore()
</script>

<template>
    <h3 class="h3" :class="[ props.colorful ? themeStore.trinaryColor : themeStore.primaryTextColor ]">{{ props.text }}</h3>
</template>

<style scoped>
.h3 {
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 1.25rem;
  margin: 0;
  transition: color 0.5s ease;
}
</style>