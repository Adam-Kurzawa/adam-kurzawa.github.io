<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div class="listing" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
		<ol v-if="props.paragraph.flavour === 'numbered'">
			<li v-for="(value, index) in props.paragraph.value" :key="index">{{ value }}</li>
		</ol>
		<ul v-else-if="props.paragraph.flavour === 'dotted'">
			<li v-for="(value, index) in props.paragraph.value" :key="index">{{ value }}</li>
		</ul>
	</div>
</template>

<style scoped>
.listing {
	transition: color 1s ease, font-size 1s ease;
	text-align: justify;
}
</style>