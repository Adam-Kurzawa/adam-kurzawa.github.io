<script setup>
import { useTranslation } from '@/utils/hooks'
import { useRouter } from 'vue-router'

const props = defineProps([ 'series', 'year', 'chapters', 'charactersCount', 'locale' ])

const router = useRouter()
const t = useTranslation()

const filterBySeries = () => {
    router.push({
        name: 'stories',
        params: { lang: props.locale },
        query: { series: props.series },
    })
}
</script>

<template>
    <a-descriptions class="table" bordered size="small" :column="1">
        <a-descriptions-item :label="t('story-card.series-column')" v-if="props.series !== null">
            <a-button type="link" size="small" @click="filterBySeries" :style="{ padding: '0', border: 'none' }">{{ props.series }}</a-button>
        </a-descriptions-item>
        <a-descriptions-item :label="t('story-card.year-column')">{{ props.year }}</a-descriptions-item>
        <a-descriptions-item :label="t('story-card.chapters-column')">{{ props.chapters }}</a-descriptions-item>
        <a-descriptions-item :label="t('story-card.characters-column')">{{ props.charactersCount }}</a-descriptions-item>
    </a-descriptions>
</template>

<style scoped>
.table {
    min-width: 20rem;
    width: 20rem;
    max-width: 20rem;
}

@media screen and (max-width: 1280px) {
    .table {
        min-width: 14rem;
        width: 14rem;
        max-width: 14rem;
    }
}

@media screen and (max-width: 1024px) {
    .table {
        min-width: 14rem;
        width: 14rem;
        max-width: 14rem;
    }
}
</style>