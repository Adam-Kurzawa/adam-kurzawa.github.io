<script setup>
const props = defineProps([ 'series', 'title' ])
</script>

<template>
	<div class="story-info">
		<div class="flex gap-6 mb-10">
			<div class="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border border-white/10">
				<img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&amp;fit=crop&amp;q=80&amp;w=400">
			</div>
			<div class="flex flex-col justify-center">
				<p class="!text-base text-slate-500 dark:text-slate-400 font-regular">{{ props.series ?? '-' }}</p>
				<h4 class="text-2xl font-serif text-slate-900 dark:text-white leading-tight mb-2">{{ props.title ?? '-' }}</h4>
			</div>
		</div>
	</div>
</template>
