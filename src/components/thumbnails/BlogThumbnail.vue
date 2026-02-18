<script setup>
import ShareIcon from '../icons/ShareIcon.vue';
import Header3 from '../system/Header3.vue';
import IconButton from '../system/IconButton.vue';

const props = defineProps([ 'title', 'img', 'publicationDate', 'description' ])
</script>

<template>
    <article class="group cursor-pointer">
        <div class="aspect-[16/10] overflow-hidden rounded-[1rem] mb-6 shadow-sm border border-slate-100">
            <img :alt="props.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :src="props.img">
        </div>
        <span class="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3 block">{{ props.publicationDate }}</span>
        <Header3 :value="props.title" />
        <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">{{ props.description }}</p>
        <div class="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-900">
            <a href="#" class="flex items-center gap-2 text-xs !font-semibold text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                Czytaj więcej
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right group-hover:translate-x-2 transition-transform" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
            </a>
            <IconButton @click="() => {}">
                <ShareIcon />
            </IconButton>
        </div>
    </article>
</template>