<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useTranslation, useAsset, useInnerWidth } from '@/utils/hooks'
import LazyStoryThumbnail from '@/components/thumbnails/LazyStoryThumbnail.vue'
import StoriesFilters from '@/components/stories/StoriesFilters.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import GenericView from '@/GenericView.vue'

const router = useRouter()
const route = useRoute()
const t = useTranslation()

const seriesQuery = route.query.series

const sortingOptions = ref([ 'Alfabetycznie', 'Od najnowszych' ]);
const currentSorting = ref('Alfabetycznie');

const sortByTitle = (a, b) => a.title.localeCompare(b.title)
const sortByDate = (a, b) => b.year - a.year

const storiesIndex = useAsset(import('@/assets/stories_idx.json'))

const loadStories = (sorter) => {
	const storiesForLocale = storiesIndex.value ? storiesIndex.value['pl'] : []

	if(seriesQuery)
		return storiesForLocale
			.filter(x => x.series && x.series === seriesQuery)
			.sort(sorter)
	else 
		return storiesForLocale
			.sort(sorter)
}

const stories = ref([])
const series = ref([])

watch(storiesIndex, () => {
	stories.value = loadStories(sortByTitle)
	series.value = storiesIndex.value['pl'].map(x => x.series).filter(x => x != undefined)
})

const changeSorting = (a) => {
	const sorter = a === 'Alfabetycznie' ? sortByTitle : sortByDate
	stories.value = loadStories(sorter)
}

const seeAll = () => {
    router.push({
        name: 'stories'
    })
}
</script>

<template>
	<GenericView>
		<Breadcrumbs class="px-6" :locations="[ { name: 'Opowiadania', target: '/stories' } ]" />
		<ViewHeader title="Biblioteka opowiadań" description="Przeglądaj pełną bibliotekę tekstów. Wybierz gatunek lub skorzystaj z wyszukiwarki, aby odnaleźć interesującą Cię historię." />
		<StoriesFilters :series="series" :selected-series="seriesQuery" />
		<div class="space-y-10">
			<LazyStoryThumbnail v-for="story in stories" :key="story.key" :title="story.key" />
		</div>
	</GenericView>
</template>

<style scoped>
.entries {
	justify-content: center;
} 

.header {
	transition: border-color 1s ease;
	border-width: 1px;
	border-style: solid;
}

.sorting {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: end;
	padding-top: 0.25rem;
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

@media screen and (max-width: 1024px) {
  .entries {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>