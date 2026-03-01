<script setup>
import { computed } from 'vue';
import Description from '../system/Description.vue';
import { useGalleryStore } from '@/stores/gallery';

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const galleryStore = useGalleryStore()

const galleryThumbnails = computed(() => props.paragraph.src.slice(0, 6))
const gallerySizeClass = computed(() => `gallery-src-${galleryThumbnails.value.length}`)

const openGallery = () => {
	galleryStore.open(props.paragraph.src)
}
</script>

<template>
	<button class="flex flex-row items-center justify-center bg-slate-50 border border-slate-100 rounded-[1rem] p-6 gap-4 hover:bg-slate-100 cursor-pointer" @click="openGallery">
		<div class="gallery-src" :class="gallerySizeClass">
			<img v-for="(thumbnail, index) in galleryThumbnails" :style="{ gridArea: `src${index}` }" :src="thumbnail" />
		</div>
		<Description v-if="props.paragraph.value" :value="props.paragraph.value" class="text-justify" :style="{ 'font-size': `${props.fontSize}rem` }"/>
	</button>
</template>

<style scoped>
.gallery-overlay {
	opacity: 0;
	transition: opacity 0.3s;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	color: white;
	left: 0;
	top: 0;
}

.gallery-src {
	display: grid;
	gap: 0.5rem;
}

.gallery:hover > .gallery-overlay {
	opacity: 1;
	cursor: pointer;
}

.gallery-src > img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.gallery-src-2 {
	min-width: 20.5rem;
	width: 20.5rem;
	max-width: 20.5rem;
	grid-template-rows: 10rem;
    grid-template-columns: 10rem 10rem;
    grid-template-areas:
        "src0 src1";
}

.gallery-src-3 {
	min-width: 15.5rem;
	width: 15.5rem;
	max-width: 15.5rem;
	grid-template-rows: 5rem 5rem;
    grid-template-columns: 10rem 5rem;
    grid-template-areas:
        "src0 src1"
		"src0 src2";
}

.gallery-src-4 {
	min-width: 20.5rem;
	width: 20.5rem;
	max-width: 20.5rem;
	grid-template-rows: 10rem 10rem;
    grid-template-columns: 10rem 10rem;
    grid-template-areas:
        "src0 src1"
		"src2 src3";
}

.gallery-src-5 {
	min-width: 31.5rem;
	width: 31.5rem;
	max-width: 31.5rem;
	grid-template-rows: 7.5rem 7.5rem;
    grid-template-columns: 7.5rem 7.5rem 7.5rem 7.5rem;
    grid-template-areas:
        "src0 src0 src1 src3"
		"src0 src0 src2 src4";
}

.gallery-src-6 {
	min-width: 23.5rem;
	width: 23.5rem;
	max-width: 23.5rem;
	grid-template-rows: 7.5rem 7.5rem 7.5rem;
    grid-template-columns: 7.5rem 7.5rem 7.5rem;
    grid-template-areas:
        "src0 src0 src1"
		"src0 src0 src2"
		"src3 src4 src5";
}
</style>