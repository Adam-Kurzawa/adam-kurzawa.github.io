<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="dialog" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
		{{ props.paragraph.value }}
	</div>
</template>

<style scoped>
.dialog {
	transition: color 1s ease, font-size 1s ease;
	text-align: justify;
}
</style>