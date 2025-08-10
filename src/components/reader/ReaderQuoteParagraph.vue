<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()
</script>

<template>
	<div>
		<a-typography-paragraph class="quote" :class="[ themeStore.primaryTextColor, props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			<blockquote>{{ props.paragraph.value }}</blockquote>
		</a-typography-paragraph>
		<div v-if="props.paragraph.author" class="quote-author" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.author }}
		</div>
	</div>
</template>

<style scoped>
.quote {
	padding-left: 5%;
	padding-right: 5%;
}

.quote-author {
	text-align: end;
	font-style: italic;
}
</style>