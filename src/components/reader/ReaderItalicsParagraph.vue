<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="italics">
		<div class="italics-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.value }}
		</div>
		<div v-if="props.paragraph.author" class="italics-author" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.author }}
		</div>
	</div>
</template>

<style scoped>
.italics {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 0.5rem;
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
	padding-left: 5%;
	padding-right: 5%;
}

.italics-value {
	font-style: italic;
	text-align: justify;
}

.italics-author {
	text-align: end;
	font-style: italic;
}
</style>