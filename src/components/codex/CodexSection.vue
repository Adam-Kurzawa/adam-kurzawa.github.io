<script setup>
import { useRouter } from 'vue-router';
import Description from '../system/Description.vue';
import LargeButton from '../system/LargeButton.vue';
import PersonIcon from '../icons/PersonIcon.vue';
import OpenBookIcon from '../icons/OpenBookIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';

const props = defineProps([ 'universum', 'cover', 'logo', 'index', 'description', 'links' ])

const router = useRouter()

const exploreAll = () => router.push({ name: 'wiki', params: { lang: 'pl', universum: props.universum } })
</script>

<template>
    <div class="relative group">
        <div class="absolute -inset-x-6 md:-inset-x-12 top-0 bottom-0 overflow-hidden -z-10 rounded-[1rem] border-1 border-slate-200 dark:border-white">
            <img alt="" class="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" :src="props.cover">
            <div class="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent"></div>
        </div>
        <div class="relative z-10 py-16 pl-16 flex flex-col lg:flex-row gap-16">
            <div class="flex flex-col lg:flex-row gap-25">
                <div class="flex flex-col lg:w-3/5">
                    <div class="text-[13rem] font-black text-slate-900/5 dark:text-white/5 absolute -top-25 -left-5 select-none pointer-events-none">{{ `0${props.index}` }}</div>
                    <div class="inline-block w-fit px-6 py-2 mb-8 text-xs font-black uppercase tracking-[0.3em] text-white bg-rose-600">Space Opera</div>
                    <img class="mb-12 leading-[0.85]" :src="props.logo" />
                    <Description :value="props.description" class="lg:flex-1" />
                    <div>
                        <button @click="exploreAll" class="flex items-center gap-4 mt-10 group/btn cursor-pointer">
                            <div class="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-[0.3rem] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                <OpenBookIcon size="22" />
                            </div>
                            <span class="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Eksploruj wszystkie wpisy</span>
                            <ArrowRightIcon />
                        </button>
                    </div>
                </div>
                <div class="lg:w-2/5">
                    <div class="flex flex-col gap-4">
                        <LargeButton v-for="value in props.links" :key="value.key" :title="value.title" description="Test">
                            <PersonIcon class="!m-3 group-hover/btn:scale-120 transition-transform" />
                        </LargeButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>