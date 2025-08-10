<script setup>
import { useThemeStore } from '@/stores/theme'
import { formatFullDate } from '@/utils/dayjs'
import { useAsset, useLocale } from '@/utils/hooks'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps([ 'title' ])

const themeStore = useThemeStore()

const router = useRouter()
const locale = useLocale()

const imageSrc = useAsset(import(`@/assets/blog/covers/${props.title}.jpg`))
const content = useAsset(import(`@/assets/blog/${props.title}_${locale.value}.json`))

const title = computed(() => content.value.title)
const description = computed(() => content.value.description)
const publicationDate = computed(() => content.value.publicationDate)

const openReader = () => {
	router.push({
		name: "reader",
		params: { lang: locale.value, title: props.title },
		query: { type: 'blog' }
	})
}
</script>

<template>
    <a-card v-if="content" class="blog-card" :class="`blog-card-${themeStore.currentTheme}`">
        <template #cover>
            <a-image :style="{ flex: '1' }" :src="imageSrc" />
        </template>
        <a-card-meta>
            <template #description>{{ description }}</template>
            <template #title>
              <a-typography-text type="secondary">{{ formatFullDate(publicationDate, locale) }}</a-typography-text>
                <a-typography-title :level="4" class="ant-btn-link title" @click="openReader">{{ title }}</a-typography-title>
            </template>
        </a-card-meta>
    </a-card>
</template>

<style scoped>
.title {
	font-family: 'Yeseva One';
	font-weight: 100;
	margin-top: 0.5rem !important;
	margin-bottom: 0.5rem !important;
	cursor: pointer;
	width: fit-content;
	text-wrap: wrap;
}

.blog-card {
	transition: background-color 0.5s ease, border-color 1s ease, font-size 1s ease;
}

.blog-card-light:hover {
	border-color: #4096ff;
	background-color: rgba(0, 0, 0, 0.05);
}

.blog-card-dark:hover {
	border-color: #3c89e8;
	background-color: rgba(256, 256, 256, 0.05);
}
</style>