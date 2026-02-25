<script setup>
import CalendarIcon from '../icons/CalendarIcon.vue';
import DocumentIcon from '../icons/DocumentIcon.vue';
import DownloadIcon from '../icons/DownloadIcon.vue';
import HashIcon from '../icons/HashIcon.vue';
import HeadphonesIcon from '../icons/HeadphonesIcon.vue';
import OpenBookIcon from '../icons/OpenBookIcon.vue';
import SeriesIcon from '../icons/SeriesIcon.vue';
import ShareIcon from '../icons/ShareIcon.vue';
import DataRow from '../system/DataRow.vue';
import Description from '../system/Description.vue';
import IconButton from '../system/IconButton.vue';
import PrimaryButton from '../system/PrimaryButton.vue';
import Stats from '../system/Stats.vue';
import Tag from '../system/Tag.vue';

const props = defineProps([ 'title', 'img', 'series', 'tags', 'publicationDate', 'chaptersCount', 'charactersCount', 'description', 'audio' ])
</script>

<template>
    <div class="relative bg-white dark:bg-slate-900 rounded-[1rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:row-span-1 md:flex-row group">
        <div class="absolute inset-0">
            <img class="w-full object-cover opacity-50 blur-xl" :src="props.img">
            <div class="absolute inset-0 bg-gradient-to-l from-white via-white to-transparent"></div>
        </div>
        <div class="w-full md:w-72 h-96 md:h-auto overflow-hidden relative flex-shrink-0 z-10">
            <img :alt="props.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" :src="props.img">
        </div>
        <div class="flex-1 p-8 md:p-10 flex flex-col z-10">
            <div class="flex flex-col xl:flex-row justify-between items-start gap-6">
                <div class="flex-1">
                    <button v-if="props.series" class="flex items-center gap-2 !text-xs !font-semibold !text-blue-600 dark:text-blue-400 !uppercase tracking-[0.2em] !mb-3 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        <SeriesIcon />
                        <span class="mt-[2px]">Cykl {{ props.series }}</span>
                    </button>
                    <h2 class="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">{{ props.title }}</h2>
                </div>
                <div class="flex items-center gap-2">
                    <PrimaryButton value="Czytaj" @click="$emit('read')">
                        <OpenBookIcon />
                    </PrimaryButton>
                    <PrimaryButton v-if="props.audio" value="Słuchaj" @click="$emit('listen-to')">
                        <HeadphonesIcon />
                    </PrimaryButton>
                    <div class="flex gap-2">
                        <IconButton @click="$emit('download')">
                            <DownloadIcon />
                        </IconButton>
                        <IconButton @click="$emit('share')">
                            <ShareIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-3 mb-8">
                <Tag v-for="tag in props.tags" :value="tag" />
            </div>
            <Description :value="props.description" />
            <DataRow>
                <Stats label="Rok wydania" :value="props.publicationDate">
                    <CalendarIcon />
                </Stats>
                <Stats label="Rozdziały" :value="props.chaptersCount">
                    <HashIcon />
                </Stats>
                <Stats label="Znaki" :value="props.charactersCount">
                    <DocumentIcon />
                </Stats>
            </DataRow>
        </div>
    </div>
</template>
