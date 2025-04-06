<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useAsset, useLocale } from '@/utils/hooks'
import StoryCard from '@/components/StoryCard.vue'
import { useTranslation } from '@/utils/hooks'

const locale = useLocale()
const router = useRouter()
const route = useRoute()
const t = useTranslation()

locale.value = route.params.lang

const seriesQuery = route.query.series

const sortingOptions = ref([ 'Alfabetycznie', 'Od najnowszych' ]);
const currentSorting = ref('Alfabetycznie');

const sortByTitle = (a, b) => a.title.localeCompare(b.title)
const sortByDate = (a, b) => b.year - a.year

const storiesIndex = useAsset(import('@/assets/stories_idx.json'))

const loadStories = (sorter) => {
	const storiesForLocale = storiesIndex.value ? storiesIndex.value[locale.value] : []

	if(seriesQuery)
		return storiesForLocale
			.filter(x => x.series && x.series === seriesQuery)
			.sort(sorter)
	else 
		return storiesForLocale
			.sort(sorter)
}

const stories = ref([])

watch(storiesIndex, () => {
	stories.value = loadStories(sortByTitle)
})

const changeSorting = (a) => {
	const sorter = a === 'Alfabetycznie' ? sortByTitle : sortByDate
	stories.value = loadStories(sorter)
}

const seeAll = () => {
    router.push({
        name: 'stories',
        params: { lang: locale.value }
    })
}
</script>

<template>
	<main class="generic-view entries" v-if="storiesIndex">
		<div class="series-row" v-if="seriesQuery">
			<a-typography-title class="series-title" :level="2">{{ t('stories-view.series') }} {{ seriesQuery }}</a-typography-title>
			<a-button @click="seeAll">{{ t('stories-view.see-all') }}</a-button>
		</div>
		<div class="sorting">
			<a-segmented v-model:value="currentSorting" :options="sortingOptions" @change="changeSorting"></a-segmented>
		</div>
		<StoryCard v-for="story in stories" :key="story.key" :title="story.key" />
	</main>
</template>

<style scoped>
.entries {
	justify-content: center;
} 

.sorting {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: end;
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