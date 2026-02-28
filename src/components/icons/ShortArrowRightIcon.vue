<script setup>
import { computed } from 'vue';

const props = defineProps([ 'size' ])
const size = computed(() => props.size ?? '16' )
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true">
					<path d="m9 18 6-6-6-6"></path>
				</svg>
</template>