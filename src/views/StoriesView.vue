<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useTranslation, useAsset, useLocale, useInnerWidth } from '@/utils/hooks'
import StoryCard from '@/components/StoryCard.vue'
import StoryCardMobile from '@/components/StoryCardMobile.vue'
import { theme } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'

const { useToken } = theme
const { token } = useToken()

const locale = useLocale()
const router = useRouter()
const route = useRoute()
const t = useTranslation()
const width = useInnerWidth()

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
		<a-page-header v-if="seriesQuery" class="header" :style="{ borderColor: token.colorBorderSecondary }" :title="`${t('stories-view.series')} ${seriesQuery}`" @back="seeAll" >
			<template #extra>
				<a-segmented v-model:value="currentSorting" :options="sortingOptions" @change="changeSorting"></a-segmented>
			</template>
			<template #backIcon>
				<CloseOutlined />
			</template>
		</a-page-header>
		<div v-else class="sorting">
			<a-segmented v-model:value="currentSorting" :options="sortingOptions" @change="changeSorting"></a-segmented>
		</div>
		<StoryCard v-if="width > 1024" v-for="story in stories" :key="story.key" :title="story.key" />
		<StoryCardMobile v-else v-for="story in stories" :key="`${story.key}-mobile`" :title="story.key" />
	</main>
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