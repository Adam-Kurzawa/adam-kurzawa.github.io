<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="image">
		<a-image :src="props.paragraph.src" :width="'50%'" />
		<div v-if="props.paragraph.value" class="image-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.value }}
		</div>
	</div>
</template>

<style scoped>
.image {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: center;
	gap: 1rem;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
}

.image-value {
	font-style: italic;
	text-align: justify;
	padding-left: 25%;
	padding-right: 25%;
	line-height: 1.25rem;
}
</style>