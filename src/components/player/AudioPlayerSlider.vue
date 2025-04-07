<script setup>
import { computed } from 'vue'

const model = defineModel()
const emit = defineEmits([ 'seekto' ])
const props = defineProps([ 'duration' ])

const videoNotLoaded = computed(() => props.duration === 0)

const toTimeString = (seconds) => {
	const withLeadingZero = (n) => n < 10 ? `0${n}` : n
	const rounded = Math.floor(seconds)
	return `${withLeadingZero(Math.floor(rounded / 60))}:${withLeadingZero(rounded % 60)}`
}
</script>

<template>
	<div>
		<a-slider v-model:value="model" :min="0" :max="props.duration" :disabled="videoNotLoaded" :tip-formatter="toTimeString" @afterChange="(n) => emit('seekto', n)" />
		<div class="progress-info">
			<a-typography-text :disabled="videoNotLoaded">{{ toTimeString(model) }}</a-typography-text>
			<a-typography-text :disabled="videoNotLoaded">{{ toTimeString(props.duration) }}</a-typography-text>
		</div>
	</div>
</template>

<style scoped>
.progress-info {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}
</style>