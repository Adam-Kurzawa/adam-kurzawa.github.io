<script setup>
const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])
</script>

<template>
	<div class="px-[5%]">
		<blockquote class="!text-slate-500 pl-[2rem] text-justify border-l-slate-400 border-l-4" :class="[ props.index !== 0 ? 'indented' : '' ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">{{ props.paragraph.value }}</blockquote>
		<div v-if="props.paragraph.author" class="quote-author" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
			{{ props.paragraph.author }}
		</div>
	</div>
</template>

<style scoped>
.quote-author {
	text-align: end;
	font-style: italic;
}
</style>