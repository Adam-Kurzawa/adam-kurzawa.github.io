<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="text" :class="[ themeStore.primaryTextColor, props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
		<span v-html="props.paragraph.value"></span>
	</div>
</template>

<style scoped>
.text {
	transition: color 1s ease, font-size 1s ease;
	text-align: justify;
}
</style>