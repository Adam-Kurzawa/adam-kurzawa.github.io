<script setup>
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue'

const props = defineProps([ 'series', 'title', 'cover', 'state', 'play' ])
</script>

<template>
	<div class="flex gap-6">
		<AudioPlayerPlaybackControls :state="props.state" :cover="props.cover" :is-maximized="true" @play="$emit('play')" @pause="$emit('pause')" />
		<div class="flex flex-col justify-center gap-2">
			<p class="text-slate-600 dark:text-slate-400 font-regular">{{ props.series ?? '-' }}</p>
			<h4 class="text-2xl font-serif text-slate-900 dark:text-white leading-tight mb-2">{{ props.title ?? '-' }}</h4>
		</div>
	</div>
</template>
