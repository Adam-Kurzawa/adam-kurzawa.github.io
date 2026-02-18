<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs uppercase tracking-widest font-bold rounded-[0.5rem] border border-slate-200 dark:border-slate-700">
        {{ props.value }}
    </span>
</template>
