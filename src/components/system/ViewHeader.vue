<script setup lang="ts">
import Header1 from '../system/Header1.vue';

const props = defineProps([ 'title', 'description' ])
</script>

<template>
    <div class="animate-in fade-in duration-500 max-w-5xl pt-20 pb-10 dark:bg-slate-950 transition-colors">
        <Header1 :value="props.title" />
        <p class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-light">{{ props.description }}</p>
    </div>
</template>