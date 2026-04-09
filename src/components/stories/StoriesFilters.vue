<script setup>
import { useRouter } from 'vue-router';
import FilterIcon from '../icons/FilterIcon.vue';
import SecondaryButton from '../system/SecondaryButton.vue';
import IconButton from '../system/IconButton.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import { computed } from 'vue';

const props = defineProps([ 'selectedSeries', 'series' ])

const router = useRouter()

const sortedSeries = computed(() => props.series.toSorted())

const filterBySeries = (series) => {
    router.push({
        name: 'stories',
        query: { series: series },
    })
}

const clearFilter = () => {
    router.push({
        name: 'stories'
    })
}
</script>

<template>
    <div class="flex flex-row items-center gap-6 top-20 z-30 py-4 -mx-6 px-6">
        <FilterIcon />
        <IconButton v-if="props.selectedSeries" @click="clearFilter">
            <CloseIcon />
        </IconButton>
        <div class="flex items-center gap-2 no-scrollbar flex-wrap">
            <SecondaryButton 
                v-for="series in sortedSeries"
                :value="series"
                :class="[
                    series === props.selectedSeries ?
                        '!bg-slate-900 dark:!bg-white !text-white dark:!text-slate-950 !border-slate-900 dark:!border-white' : 
                        ''
                ]"
                @click="filterBySeries(series)"
            ></SecondaryButton>
        </div>
    </div>
</template>