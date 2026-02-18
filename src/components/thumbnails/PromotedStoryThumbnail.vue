<script setup>
import HeadphonesIcon from '../icons/HeadphonesIcon.vue';
import PrimaryButton from '../system/PrimaryButton.vue';

const props = defineProps([ 'title', 'img', 'description' ])
</script>

<template>
    <div class="relative overflow-hidden rounded-[1rem] p-8 md:p-12 min-h-[500px] flex flex-col justify-start group shadow-2xl bg-slate-950 text-white">
        <div class="absolute inset-0 z-0">
            <img class="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" :src="props.img">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        <div class="relative z-10 flex flex-col md:flex-row gap-8">
            <div class="w-48 flex-shrink-0 shadow-2xl">
                <img :alt="props.title" class="w-full rounded-[0.8rem] border border-white/10" :src="props.img">
            </div>
            <div class="flex-1">
                <h3 class="text-3xl md:text-4xl font-serif mb-6">{{ props.title }}</h3>
                <p v-for="(desc, index) in props.description" :key="`${props.title}-${desc}-${index}`" class="text-slate-300 text-sm leading-relaxed text-justify mb-8 font-light">{{ desc }}</p>
                <div class="flex flex-wrap gap-4">
                    <PrimaryButton value="Posłuchaj audiobooka" class="py-3">
                        <HeadphonesIcon />
                    </PrimaryButton>
                    <PrimaryButton value="Przeczytaj opowiadanie" class="!bg-white/10 hover:!bg-white/20 !backdrop-blur-md shadow-none py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open" aria-hidden="true"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    </div>
</template>