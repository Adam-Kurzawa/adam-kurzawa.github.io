<script setup>
import { computed } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useThemeStore } from '@/stores/theme'
import highlight from '@/utils/highlightjs'
import formatCode from '@/utils/prettier.js'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()

const codeFontSize = computed(() => props.fontSize - 0.35)

const formattedCode = computedAsync(
	async () => {
		const lang = props.paragraph.language
		const code = props.paragraph.value
		const f = await formatCode(lang, code)
		return highlight(lang, f)
	}, 
	null,
	{ lazy: true }
)
</script>

<template>
	<div class="code" :class="`code-${themeStore.currentTheme}`" :style="{ 'font-size': `${codeFontSize}rem` }">
		<div class="code-language" :class="[ themeStore.primaryTextColor ]">{{ props.paragraph.language }}</div>
		<pre v-html="formattedCode"></pre>
	</div>
</template>

<style scoped>
.code {
	transition: background-color 0.5s ease, font-size 1s ease;
	margin-top: 1rem;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
	padding: 1rem;
}

.code > pre {
	max-width: 100%;
}

.code-light {
  	background-color: lightgray;
}

.code-dark {
  	background-color: darkslategray;
}

.code-language {
	margin-bottom: 1rem;
	font-size: small;
	text-transform: uppercase;
	font-weight: bold;
}
</style>