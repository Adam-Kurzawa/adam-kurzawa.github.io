<script setup>
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons-vue';
import { onMounted, onUnmounted, ref } from 'vue';

const isPlaying = ref(false)
const min = ref(0)
const max = ref(18483)
const progress = ref(0)
let interval = null

const togglePlay = () => {
	isPlaying.value = !isPlaying.value
}

const rewind = (value) => {
	console.log('onChange: ', value);
}

onMounted(() => {
	interval = setInterval(() => {
		progress.value += 1
	}, 1000)
})

onUnmounted(() => {
	window.clearInterval(interval)
})
</script>

<template>
	<a-card class="audioplayer">
		<div>
			<div class="top-row">
				<a-button shape="circle" size="large" @click="togglePlay">
					<template #icon>
						<PlayCircleFilled v-if="isPlaying" />
						<PauseCircleFilled v-else />
					</template>
				</a-button>
				<div class="story-info">
					<a-typography-text type="secondary">Deus Vult</a-typography-text>
					<a-typography-text strong>Bukowe Widziadło</a-typography-text>
				</div>
			</div>
			<div>
				<a-slider id="test" v-model:value="progress" :min="min" :max="max" @afterChange="rewind" />
				<div class="progress-info">
					<a-typography-text>{{ `${Math.floor(progress / 60)}:${progress % 60}` }}</a-typography-text>
					<a-typography-text>1:12:33</a-typography-text>
				</div>
			</div>
		</div>
	</a-card>
</template>

<style scoped>
.audioplayer {
	width: 20rem;
	position: fixed;
	bottom: 3rem;
	right: 3rem;
	z-index: 200;
	box-shadow: 0px 0px 50px 0px rgba(163, 163, 163, 1);
}

.story-info {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.progress-info {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
}

.top-row {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 2rem;
	margin-bottom: 1rem;
}
</style>