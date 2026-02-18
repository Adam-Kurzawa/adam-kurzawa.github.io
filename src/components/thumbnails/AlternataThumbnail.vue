<script setup>
import OpenBookIcon from '../icons/OpenBookIcon.vue';
import PrimaryButton from '../system/PrimaryButton.vue';
import SecondaryButton from '../system/SecondaryButton.vue';

const props = defineProps([ 'title', 'img', 'description' ])
</script>

<template>
    <div class="bg-white p-2 rounded-[1rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
        <div class="aspect-[4/5] rounded-[0.8rem] overflow-hidden mb-4 relative">
            <img :alt="props.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" :src="props.img">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <SecondaryButton value="Czytaj">
                    <OpenBookIcon />
                </SecondaryButton>
            </div>
        </div>
        <div class="px-4 pb-4">
            <h4 class="text-lg font-bold text-slate-900 mb-2">{{ props.title }}</h4>
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{{ props.description }}</p>
        </div>
    </div>
</template>
