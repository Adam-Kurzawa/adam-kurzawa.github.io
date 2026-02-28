<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Description from './Description.vue';

dayjs.extend(relativeTime);

const props = defineProps([ 'name', 'timestamp', 'value' ])

const initials = computed(() => props.name.slice(0, 2).toUpperCase())
</script>

<template>
    <div class="group animate-in fade-in slide-in-from-right-4 duration-500">
        <div class="flex items-center gap-3 mb-1">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600 uppercase">{{ initials }}</div>
            <div class="flex flex-col">
                <span class="text-base font-bold text-slate-900 dark:text-white">{{ props.name }}</span>
                <span class="text-xs text-slate-400 font-medium">{{ dayjs(props.timestamp).fromNow() }}</span>
            </div>
        </div>
        <Description class="pl-11 !text-base" :value="props.value" />
    </div>
</template>