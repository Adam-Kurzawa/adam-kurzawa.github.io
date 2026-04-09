<script setup>
import { computed } from 'vue';

const props = defineProps([ 'value', 'disabled' ])
const disabled = computed(() => props.disabled ?? false)
</script>

<template>
    <button class="flex items-center cursor-pointer justify-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 !text-white rounded-[0.5rem] !text-xs !font-bold !uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 disabled:bg-blue-300" :disabled="disabled">
        <slot></slot>
        <span class="hidden md:inline">{{ props.value }}</span>
    </button>
</template>