<script setup>
import YesIcon from '../icons/YesIcon.vue';

const props = defineProps({
	value: String
})
</script>

<template>
	<div class="bg-green-500 text-white rounded-[0.5rem] shadow-2xl flex items-center">
		<YesIcon size="48" class="mx-1" />
		<p class="bg-slate-900 text-base font-bold align-center py-4 !m-0 px-4 rounded-[0.5rem]">{{ props.value }}</p>
	</div>
</template>