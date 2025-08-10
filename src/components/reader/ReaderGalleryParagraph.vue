<script setup>
import { useThemeStore } from '@/stores/theme';
import { computed, ref } from 'vue';
import { theme } from 'ant-design-vue'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const themeStore = useThemeStore()

const { useToken } = theme
const { token } = useToken()

const visible = ref(false);
const galleryThumbnails = computed(() => props.paragraph.src.slice(0, 6))
const gallerySizeClass = computed(() => `gallery-src-${galleryThumbnails.value.length}`)
const galleryValueClass = computed(() => `gallery-value-${galleryThumbnails.value.length}`)

const openGallery = () => {
	visible.value = true
}

const onVisibleChange = (vis) => {
	visible.value = vis
}
</script>

<template>
	<div :style="{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }">
		<a-card class="gallery" :style="{ width: 'fit-content' }">
			<div class="gallery-src" :class="gallerySizeClass">
				<img v-for="(thumbnail, index) in galleryThumbnails" :style="{ gridArea: `src${index}` }" :src="thumbnail" />
			</div>
			<div v-if="props.paragraph.value" class="gallery-value" :class="[ themeStore.primaryTextColor, galleryValueClass ]" :style="{ 'font-size': `${props.fontSize}rem`, 'font-family': props.fontFamily }">
				{{ props.paragraph.value }}
			</div>
			<div class="gallery-overlay" :style="{ borderRadius: `${token.borderRadiusLG}px` }" @click="openGallery">
				Preview
			</div>
			<div class="gallery-src-all">
				<a-image-preview-group :preview="{ visible, onVisibleChange: onVisibleChange  }">
					<a-image v-for="img in props.paragraph.src" :src="img" />
				</a-image-preview-group>
			</div>
		</a-card>
	</div>
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

.gallery:hover > .ant-card-body > .gallery-overlay {
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

.gallery-src-all {
	display: none;
}

.gallery-value {
	font-style: italic;
	text-align: justify;
	line-height: 1.25rem;
	margin-top: 1rem;
}

.gallery-value-2 {
	max-width: 20.5rem;
}

.gallery-value-3 {
	max-width: 15.5rem;
}

.gallery-value-4 {
	max-width: 20.5rem;
}

.gallery-value-5 {
	max-width: 31.5rem;
}

.gallery-value-6 {
	max-width: 23.5rem;
}
</style>