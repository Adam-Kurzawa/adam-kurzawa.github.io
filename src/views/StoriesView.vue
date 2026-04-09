<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useTranslation } from '@/utils/useTranslation'
import LazyStoryThumbnail from '@/components/thumbnails/LazyStoryThumbnail.vue'
import StoriesFilters from '@/components/stories/StoriesFilters.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import GenericView from '@/GenericView.vue'
import { useMetaindex } from '@/utils/useMetaindex'
import StoriesSorter from '@/components/stories/StoriesSorter.vue'
import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies()
const route = useRoute()
const t = useTranslation()

const seriesQuery = route.query.series

const sortByTitle = (a, b) => a.title.localeCompare(b.title)
const sortByDate = (a, b) => {
	const result = Number(b.publicationDate.slice(-4)) - Number(a.publicationDate.slice(-4))
	return result === 0 ? sortByTitle(a, b) : result
}

const metaindex = useMetaindex()

const stories = computed(() => {
	const storiesIndex = Object.values(metaindex.value.story)
	const sorting = cookies.get('sorting')
	let sorter = undefined

	switch (sorting) {
		case 'ALPHABETICALLY':
			sorter = sortByTitle
			break
		case 'NEWEST_FIRST':
			sorter = sortByDate
			break
		default:
			sorter = sortByTitle
			break
	}

	if(seriesQuery)
		return storiesIndex
			.filter(story => story.series && story.series === seriesQuery)
			.toSorted(sorter)
	else 
		return storiesIndex
			.toSorted(sorter)
})

const series = computed(() => {
	return Object
		.values(metaindex.value.story)
		.map(story => story.series)
		.filter(serie => serie !== undefined && serie !== null)
})
</script>

<template>
	<GenericView>
		<Breadcrumbs :locations="[ { name: 'Opowiadania', target: '/stories' } ]" />
		<ViewHeader title="Biblioteka opowiadań" description="Przeglądaj pełną bibliotekę tekstów. Wybierz gatunek lub skorzystaj z wyszukiwarki, aby odnaleźć interesującą Cię historię." />
		<template v-if="metaindex">
			<div class="flex flex-row items-center">
				<StoriesFilters :series="series" :selected-series="seriesQuery" class="flex-1" />
				<StoriesSorter />
			</div>
			<div class="space-y-10">
				<LazyStoryThumbnail v-for="story in stories" :key="story.documentId" :metadata="story" />
			</div>
		</template>
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