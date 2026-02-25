<script setup>
import PauseIcon from '../icons/PauseIcon.vue';
import PlayIcon from '../icons/PlayIcon.vue';

const props = defineProps([ 'state' ])
</script>

<template>
	<button v-if="props.state === 1" @click="$emit('pause')">
		<PauseIcon :size="25" />
	</button>
	<button v-else :disabled="props.state !== 2 && props.state !== 5" @click="$emit('play')">
		<PlayIcon :size="25" />
	</button>
</template>
