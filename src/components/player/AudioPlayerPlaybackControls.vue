<script setup>
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons-vue';

const props = defineProps([ 'isPlaying' ])
</script>

<template>
	<a-button v-if="isPlaying" shape="circle" size="large" class="player-button" @click="$emit('pause')">
		<template #icon>
			<PauseCircleFilled />
		</template>
	</a-button>
	<a-button v-else shape="circle" size="large" class="player-button" @click="$emit('play')">
		<template #icon>
			<PlayCircleFilled />
		</template>
	</a-button>
</template>

<style scoped>
.player-button {
	padding: 0 !important;
	font-size: 1.75rem;
}

.player-button > span {
	display: block !important;
}
</style>