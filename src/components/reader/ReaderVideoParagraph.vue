<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="video">
		<iframe :src="props.paragraph.src" class="video-src"></iframe>
		<div v-if="props.paragraph.value" class="video-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.value }}
		</div>
	</div>
</template>

<style scoped>
.video {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: center;
	gap: 1rem;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
}

.video-src {
	min-width: 50%;
	width: 50%;
	max-width: 50%;
	height: auto;
}

.video-value {
	font-style: italic;
	text-align: justify;
	padding-left: 25%;
	padding-right: 25%;
	line-height: 1.25rem;
}
</style>