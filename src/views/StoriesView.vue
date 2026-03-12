<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useAsset } from '@/utils/useAsset'
import { useTranslation } from '@/utils/useTranslation'
import LazyStoryThumbnail from '@/components/thumbnails/LazyStoryThumbnail.vue'
import StoriesFilters from '@/components/stories/StoriesFilters.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import GenericView from '@/GenericView.vue'
import { useMetaindex } from '@/utils/useMetaindex'

const router = useRouter()
const route = useRoute()
const t = useTranslation()

const seriesQuery = route.query.series

const sortingOptions = ref([ 'Alfabetycznie', 'Od najnowszych' ]);
const currentSorting = ref('Alfabetycznie');

const sortByTitle = (a, b) => a.title.localeCompare(b.title)
const sortByDate = (a, b) => b.year - a.year

const metaindex = useMetaindex()

const stories = computed(() => {
	const storiesIndex = Object.values(metaindex.value.story)

	if(seriesQuery)
		return storiesIndex
			.filter(story => story.series && story.series === seriesQuery)
	else 
		return storiesIndex
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
			<StoriesFilters :series="series" :selected-series="seriesQuery" />
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