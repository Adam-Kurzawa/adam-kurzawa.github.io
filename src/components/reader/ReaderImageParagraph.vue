<script setup>
import { useGalleryStore } from '@/stores/gallery';
import Description from '../system/Description.vue';

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const galleryStore = useGalleryStore()

const openGallery = () => {
	galleryStore.open([ props.paragraph.src ])
}
</script>

<template>
	<button class="flex flex-row items-center justify-center bg-slate-50 border border-slate-100 rounded-[1rem] p-6 gap-4 hover:bg-slate-100 cursor-pointer" @click="openGallery">
		<img :src="props.paragraph.src" class="w-[50%]" />
		<Description v-if="props.paragraph.value" :value="props.paragraph.value" class="text-justify" :style="{ 'font-size': `${props.fontSize}rem` }" />
	</button>
</template>
