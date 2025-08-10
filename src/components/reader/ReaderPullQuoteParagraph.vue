<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="pull-quote" :class="`pull-quote-${themeStore.currentTheme}`" :style="{ 'font-size': `${props.fontSize}rem` }">
		{{ props.paragraph.value }}
	</div>
</template>

<style scoped>
.pull-quote {
	transition: color 1s ease, font-size 1s ease;
	border: 0.5rem solid rgb(129, 129, 221);
	border-bottom-left-radius: 2rem;
	border-top-right-radius: 2rem;
	padding: 2rem;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
}

.pull-quote-light {
	color: rgb(16, 16, 122);
}

.pull-quote-dark {
	color: rgb(185, 210, 255);
}
</style>