<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <a class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group">
        {{ props.value }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    </a>
</template>
