<script setup>
import PauseIcon from '../icons/PauseIcon.vue';
import PlayIcon from '../icons/PlayIcon.vue';

const props = defineProps([ 'state', 'cover', 'isMaximized' ])
</script>

<template>
	<div class="flex-shrink-0 rounded-[1rem] overflow-hidden shadow-xl relative bg-slate-200" :class="[ props.isMaximized ? 'size-24' : 'size-16' ]">
		<button v-if="props.state === 1" @click="$emit('pause')" class="absolute bg-black/25 !text-white w-full h-full flex items-center justify-center">
			<PauseIcon :size="25" />
		</button>
		<button v-else :disabled="props.state !== 2 && props.state !== 5" @click="$emit('play')" class="absolute bg-black/25 !text-white w-full h-full flex items-center justify-center">
			<PlayIcon :size="25" />
		</button>
		<img v-if="props.cover" class="w-full h-full object-cover"  :src="props.cover">
	</div>
</template>
