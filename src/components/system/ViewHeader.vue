<script setup lang="ts">
import Header1 from '../system/Header1.vue';
import Description from './Description.vue';

const props = defineProps([ 'title', 'description' ])
</script>

<template>
    <div class="animate-in fade-in duration-500 max-w-5xl space-y-4 dark:bg-slate-950 transition-colors">
        <Header1 :value="props.title" />
        <Description :value="props.description" class="max-w-2xl" />
    </div>
</template>