<script setup>
import CalendarIcon from '../icons/CalendarIcon.vue';
import ShareIcon from '../icons/ShareIcon.vue';
import Header4 from '../system/Header4.vue';
import Hyperlink from '../system/Hyperlink.vue';
import IconButton from '../system/IconButton.vue';

const props = defineProps([ 'title', 'img', 'publicationDate', 'description' ])
</script>

<template>
    <article class="group cursor-pointer overflow-hidden">
        <div class="aspect-[16/10] overflow-hidden rounded-[1rem] mb-6 shadow-sm" @click="$emit('read')">
            <img :alt="props.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :src="props.img">
        </div>
        <div class="space-y-2">
            <div class="flex flex-row gap-2 text-blue-500">
                <CalendarIcon size="12" />
                <span class="text-xs font-bold uppercase tracking-widest block">{{ props.publicationDate }}</span>
            </div>
            <Header4 :value="props.title" @click="$emit('read')"/>
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2" @click="$emit('read')">{{ props.description }}</p>
            <div class="flex items-center justify-between">
                <Hyperlink value="Czytaj więcej" @click="$emit('read')" />
                <IconButton @click="$emit('share')">
                    <ShareIcon />
                </IconButton>
            </div>
        </div>
    </article>
</template>