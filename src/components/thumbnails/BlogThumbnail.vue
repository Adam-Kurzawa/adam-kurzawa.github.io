<script setup>
import CalendarIcon from '../icons/CalendarIcon.vue';
import ShareIcon from '../icons/ShareIcon.vue';
import Header4 from '../system/Header4.vue';
import Hyperlink from '../system/Hyperlink.vue';
import IconButton from '../system/IconButton.vue';
import Tag from '../system/Tag.vue';

const props = defineProps([ 'title', 'img', 'publicationDate', 'description', 'tags' ])
</script>

<template>
    <article class="group cursor-pointer overflow-hidden">
        <div class="aspect-[16/10] overflow-hidden rounded-[1rem] mb-4 shadow-sm" @click="$emit('read')">
            <img :alt="props.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" :src="props.img">
        </div>
        <div class="space-y-2">
            <div class="flex flex-row justify-between">
                <div class="flex flex-row gap-2 text-blue-500 items-center">
                    <CalendarIcon size="12" />
                    <span class="text-xs mt-0.5 font-bold uppercase tracking-widest block">{{ props.publicationDate }}</span>
                </div>
                <div class="flex flex-row gap-2">
                    <Tag v-for="tag in props.tags" :key="tag" :value="tag" />
                </div>
            </div>
            <Header4 :value="props.title" @click="$emit('read')"/>
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2" @click="$emit('read')">{{ props.description }}</p>
            <div class="flex items-center justify-between">
                <Hyperlink value="Czytaj" @click="$emit('read')" />
                <IconButton @click="$emit('share')">
                    <ShareIcon />
                </IconButton>
            </div>
        </div>
    </article>
</template>