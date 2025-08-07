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
	<div v-if="props.paragraph.type === 'text'" class="text" :class="[ themeStore.primaryTextColor, props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
		<span v-html="props.paragraph.value"></span>
	</div>
	<div v-else-if="props.paragraph.type === 'code'" class="code" :class="`code-${themeStore.currentTheme}`" :style="{ 'font-size': `${codeFontSize}rem` }">
		<div class="code-language" :class="[ themeStore.primaryTextColor ]">{{ props.paragraph.language }}</div>
		<pre v-html="formattedCode"></pre>
	</div>
	<div v-else-if="props.paragraph.type === 'quote'">
		<a-typography-paragraph class="quote" :class="[ themeStore.primaryTextColor, props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			<blockquote>{{ props.paragraph.value }}</blockquote>
		</a-typography-paragraph>
		<div v-if="props.paragraph.author" class="quote-author" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.author }}</div>
	</div>
	<div v-else-if="props.paragraph.type === 'pull-quote'" class="pull-quote" :class="`pull-quote-${themeStore.currentTheme}`" :style="{ 'font-size': `${props.fontSize}rem` }">
		{{ props.paragraph.value }}
	</div>
	<div v-else-if="props.paragraph.type === 'italics'" class="italics">
		<div class="italics-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.value }}</div>
		<div v-if="props.paragraph.author" class="italics-author" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.author }}</div>
	</div>
	<div v-else-if="props.paragraph.type === 'image'" class="image">
		<a-image :src="props.paragraph.src" :width="'50%'" />
		<div v-if="props.paragraph.value" class="image-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.value }}</div>
	</div>
	<div v-else-if="props.paragraph.type === 'video'" class="video">
		<iframe :src="props.paragraph.src" class="video-src"></iframe>
		<div v-if="props.paragraph.value" class="video-value" :class="[ themeStore.primaryTextColor ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.value }}</div>
	</div>
	<div v-else class="text" :class="[ themeStore.primaryTextColor, props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
		{{ props.paragraph }}
	</div>
</template>

<style scoped>
.indented {
  	text-indent: 2rem;
}

.text {
	transition: color 1s ease, font-size 1s ease;
	text-align: justify;
}

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

.quote {
	padding-left: 5%;
	padding-right: 5%;
}

.quote-author {
	text-align: end;
	font-style: italic;
}

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
}

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
}
</style>