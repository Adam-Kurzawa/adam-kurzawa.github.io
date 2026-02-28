<script setup>
import { computed } from 'vue';

const props = defineProps([ 'size' ])
const size = computed(() => props.size ?? '16' )
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle animate-spin" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
</template>