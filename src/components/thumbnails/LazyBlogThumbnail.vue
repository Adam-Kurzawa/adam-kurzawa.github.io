<script setup>
import { useRouter } from 'vue-router'
import BlogThumbnail from './BlogThumbnail.vue'
import { useStaticAsset } from '@/utils/useStaticAsset'

const props = defineProps([ 'metadata' ])

const router = useRouter()
const imageSrc = useStaticAsset(`${props.metadata.documentId}.jpg`)

const openReader = () => {
	router.push({
		name: "reader",
		params: { title: props.metadata.documentId, type: 'blog' }
	})
}
</script>

<template>
    <BlogThumbnail :title="props.metadata.title" 
		           :img="imageSrc" 
		           :publication-date="props.metadata.publicationDate" 
		           :description="props.metadata.description" 
				   :tags="props.metadata.tags"
		           @read="openReader" 
		           @share="() => {}"
	/>
</template>