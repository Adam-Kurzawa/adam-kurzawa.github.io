<script setup>
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue'

const props = defineProps([ 'series', 'title', 'cover', 'state', 'play' ])
</script>

<template>
	<div class="story-info">
		<div class="flex gap-6 mb-10">
			<div class="w-24 h-24 flex-shrink-0 rounded-[1rem] overflow-hidden shadow-xl relative bg-slate-200">
				<AudioPlayerPlaybackControls :state="props.state" @play="$emit('play')" @pause="$emit('pause')" class="absolute bg-black/25 !text-white w-full h-full flex items-center justify-center" />
				<img v-if="cover" class="w-full h-full object-cover" :src="props.cover">
			</div>
			<div class="flex flex-col justify-center">
				<p class="!text-base text-slate-500 dark:text-slate-400 font-regular">{{ props.series ?? '-' }}</p>
				<h4 class="text-2xl font-serif text-slate-900 dark:text-white leading-tight mb-2">{{ props.title ?? '-' }}</h4>
			</div>
		</div>
	</div>
</template>
