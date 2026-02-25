<script setup lang="ts">
import { computed } from 'vue';
import LazyBlogThumbnail from '../thumbnails/LazyBlogThumbnail.vue';

const props = defineProps([ 'year', 'titles' ])

const first = computed(() => props.titles[0])
const rest = computed(() => props.titles.slice(1))
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        <div class="lg:w-32 flex-shrink-0">
            <div class="lg:sticky lg:top-40">
                <h2 class="text-7xl md:text-8xl !mb-0 font-serif text-slate-200 dark:text-slate-900 leading-none tracking-tighter">{{ props.year }}</h2>
                <div class="mt-2 h-1 w-12 bg-blue-600 rounded-full"></div>
                <p class="!mt-4 !text-xs !font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">{{ props.titles.length }} wpisy</p>
            </div>
        </div>
        <div class="flex-grow">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                <LazyBlogThumbnail class="md:col-span-2" :title="first" />
                <LazyBlogThumbnail v-for="title in rest" class="md:col-span-1" :key="title" :title="title" />
            </div>
        </div>
    </div>
</template>
