<script setup>
import FilterIcon from '../icons/FilterIcon.vue';
import SecondaryButton from '../system/SecondaryButton.vue';

const props = defineProps([ 'selectedSeries', 'series' ])
</script>

<template>
    <div class="animate-in fade-in duration-500 max-w-5xl dark:bg-slate-950 transition-colors">
        <div class="flex flex-col md:flex-row items-stretch md:items-center gap-6 mb-12 bg-white dark:bg-slate-950 sticky top-20 z-30 py-4 -mx-6 px-6 border-b border-slate-50 dark:border-slate-900">
            <FilterIcon />
            <div class="flex items-center gap-2 pb-2 md:pb-0 no-scrollbar flex-wrap">
                <SecondaryButton 
                    v-for="series in props.series"
                    :value="series"
                    :class="[
                        series === props.selectedSeries ?
                            '!bg-slate-900 dark:!bg-white !text-white dark:!text-slate-950 !border-slate-900 dark:!border-white' : 
                            ''
                    ]"
                ></SecondaryButton>
            </div>
        </div>
    </div>
</template>