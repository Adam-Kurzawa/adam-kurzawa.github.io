<script setup>
import { computed } from 'vue';

const props = defineProps([ 'size' ])
const size = computed(() => props.size ?? '16' )
</script>


<template>
	<svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right text-slate-300 group-hover/link:text-slate-900 dark:group-hover/link:text-white transition-colors" aria-hidden="true">
		<path d="M7 7h10v10"></path>
		<path d="M7 17 17 7"></path>
	</svg>
</template>