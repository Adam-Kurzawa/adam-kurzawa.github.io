<script setup>
import { useAsset } from '@/utils/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BlogThumbnail from './BlogThumbnail.vue'

const props = defineProps([ 'title' ])

const router = useRouter()

const imageSrc = useAsset(import(`@/assets/blog/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/blog/${props.title}_pl.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const publicationDate = computed(() => content.value.publicationDate)

const openReader = () => {
	router.push({
		name: "reader",
		params: { title: props.title },
		query: { type: 'blog' }
	})
}
</script>

<template>
    <BlogThumbnail v-if="content" 
		:title="title" 
		:img="imageSrc" 
		:publication-date="publicationDate" 
		:description="description" 
		@read="openReader" 
		@share="() => {}"
	/>
</template>