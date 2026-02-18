<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <button @click="$emit('click')" class="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-[0.5rem] !text-xs !font-bold !uppercase tracking-wider !text-slate-600 dark:text-slate-400 transition-all border border-slate-100 dark:border-slate-800">
        <slot></slot>
        <span class="hidden sm:inline">{{ props.value }}</span>
    </button>
</template>