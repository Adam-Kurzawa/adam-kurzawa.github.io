<script setup>
import { computed } from 'vue';
import SecondaryButton from '../system/SecondaryButton.vue';
import { useCookies } from '@vueuse/integrations/useCookies';

const cookies = useCookies()

const selected = computed(() => cookies.get('sorting'))

const setSorting = (sorting) => {
    cookies.set("sorting", sorting)
} 
</script>

<template>
    <div class="flex flex-row flex-nowrap items-center gap-1 bg-slate-50 border border-slate-200 rounded-[0.5rem] p-1">
        <SecondaryButton @click="setSorting('ALPHABETICALLY')" value="Alfabetycznie" :class="[ selected === 'ALPHABETICALLY' ? '!bg-slate-700 !text-white hover:!text-white' : '!bg-slate-200 hover:!bg-slate-300' ]"></SecondaryButton>
        <SecondaryButton @click="setSorting('NEWEST_FIRST')" value="Najnowsze" :class="[ selected === 'NEWEST_FIRST' ? '!bg-slate-700 !text-white hover:!text-white' : '!bg-slate-200 hover:!bg-slate-300' ]""></SecondaryButton>
    </div>
</template>