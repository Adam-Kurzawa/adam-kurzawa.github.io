<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useLocale } from '@/utils/hooks'
import StoryCard from '@/components/StoryCard.vue'
import { useTranslation } from '@/utils/hooks'

const locale = useLocale()
const router = useRouter()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang

const seriesQuery = route.query.series

const stories = ref(
	new Set(
		Object
			.keys(import.meta.glob('@/assets/story/*.json'))
			.map(s => s.substring(18).slice(0, -8))
	)
)

const seeAll = () => {
    router.push({
        name: 'stories',
        params: { lang: locale.value }
    })
}
</script>

<template>
	<main class="generic-view entries">
		<div class="series-row" v-if="seriesQuery">
			<a-typography-title class="series-title" :level="2">{{ t('stories-view.series') }} {{ seriesQuery }}</a-typography-title>
			<a-button @click="seeAll">{{ t('stories-view.see-all') }}</a-button>
		</div>
		<StoryCard v-for="story in stories" :title="story" :series-filter="seriesQuery" />
	</main>
</template>

<style scoped>
.entries {
	justify-content: center;
} 

.series-row {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 2rem;
	align-items: center;
    justify-content: space-between;
}

.series-title {
	font-family: 'Yeseva One';
	font-weight: 100;
	margin-top: 0.75rem;
}
</style>