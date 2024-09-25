<script setup>
import { useThemeStore } from '@/stores/theme';

const props = defineProps([ 'text' ])

const themeStore = useThemeStore()
</script>

<template>
    <div class="font-segoe" :class="themeStore.secondaryTextColor">{{ text }}</div>
</template>