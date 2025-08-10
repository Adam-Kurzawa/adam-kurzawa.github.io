<script setup>
import ReaderCodeParagraph from './ReaderCodeParagraph.vue';
import ReaderDialogParagraph from './ReaderDialogParagraph.vue';
import ReaderGalleryParagraph from './ReaderGalleryParagraph.vue';
import ReaderImageParagraph from './ReaderImageParagraph.vue';
import ReaderItalicsParagraph from './ReaderItalicsParagraph.vue';
import ReaderPullQuoteParagraph from './ReaderPullQuoteParagraph.vue';
import ReaderQuoteParagraph from './ReaderQuoteParagraph.vue';
import ReaderTableParagraph from './ReaderTableParagraph.vue';
import ReaderTextParagraph from './ReaderTextParagraph.vue'
import ReaderVideoParagraph from './ReaderVideoParagraph.vue';

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])
</script>

<template>
	<ReaderTextParagraph v-if="props.paragraph.type === 'text'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderDialogParagraph v-else-if="props.paragraph.type === 'dialog'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderTableParagraph v-else-if="props.paragraph.type === 'table'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderCodeParagraph v-else-if="props.paragraph.type === 'code'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderQuoteParagraph v-else-if="props.paragraph.type === 'quote'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderPullQuoteParagraph v-else-if="props.paragraph.type === 'pull-quote'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderItalicsParagraph v-else-if="props.paragraph.type === 'italics'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderImageParagraph v-else-if="props.paragraph.type === 'image'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderGalleryParagraph v-else-if="props.paragraph.type === 'gallery'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderVideoParagraph v-else-if="props.paragraph.type === 'video'" :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
	<ReaderTextParagraph v-else :paragraph="props.paragraph" :index="props.index" :font-size="props.fontSize" :font-family="props.fontFamily" />
</template>