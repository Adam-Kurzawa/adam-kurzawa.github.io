<script setup>
const props = defineProps([ 'title', 'description' ])
</script>

<template>
	<button class="flex cursor-pointer items-center gap-5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-[1rem] border border-slate-100 dark:border-slate-800 hover:border-blue-600/30 hover:bg-white dark:hover:bg-slate-900 transition-all group/btn">
		<slot></slot>
		<div class="text-left truncate">
			<p class="text-sm font-bold text-slate-900 dark:text-white truncate line-clamp-1">{{ props.title }}</p>
			<p class="text-xs text-slate-400">{{ props.description }}</p>
		</div>
	</button>
</template>
