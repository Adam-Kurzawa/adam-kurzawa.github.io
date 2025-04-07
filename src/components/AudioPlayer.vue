<script setup>
import { PlayCircleFilled, PauseCircleFilled, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const playerIframe = useTemplateRef('ytplayer')
const ytPlayer = ref()
const isPlaying = ref(false)
const isMinimized = ref(true)
const min = ref(0)
const max = ref(0)
const progress = ref(0)
let interval = null

const addInterval = () => {
	interval = setInterval(() => {
		progress.value += 1
	}, 1000)
}

const removeInterval = () => {
	if(interval)
		window.clearInterval(interval)
}

const toggleSize = () => {
	isMinimized.value = !isMinimized.value
}

const togglePlay = () => {
	isPlaying.value = !isPlaying.value

	if(isPlaying.value) {
		ytPlayer.value.playVideo()
		addInterval()
		max.value = ytPlayer.value.getDuration()
	} else {
		ytPlayer.value.pauseVideo()
		removeInterval()
	}
}

const rewind = (value) => {
	ytPlayer.value.seekTo(value)
}

const toTimeString = (seconds) => {
	const withLeadingZero = (n) => n < 10 ? `0${n}` : n
	return `${withLeadingZero(Math.floor(seconds / 60))}:${withLeadingZero(seconds % 60)}`
}

const loadYouTubeIframeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player)
      resolve()
    else 
      window.onYouTubeIframeAPIReady = resolve
  })
}

onMounted(async () => {
	await loadYouTubeIframeAPI()
	ytPlayer.value = new YT.Player(playerIframe.value.id)
})

onUnmounted(() => {
	removeInterval()
})
</script>

<template>
	<a-card class="audioplayer" :class="[ isMinimized ? 'minimized' : 'maximized' ]">
		<iframe id="ytplayer" ref="ytplayer" width="0" height="0" class="yt" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=KFE4j8Wxj0xsZqHO?rel=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		<div v-if="!isMinimized">
			<div class="maximized-layout">
				<a-button shape="circle" size="large" class="player-button" @click="togglePlay">
					<template #icon>
						<PauseCircleFilled v-if="isPlaying" />
						<PlayCircleFilled v-else />
					</template>
				</a-button>
				<div class="story-info">
					<a-typography-text type="secondary">Deus Vult</a-typography-text>
					<a-typography-text strong>Bukowe Widziadło</a-typography-text>
				</div>
				<a-button type="text" shape="circle" size="large" @click="toggleSize">
					<template #icon>
						<ArrowRightOutlined />
					</template>
				</a-button>
			</div>
			<div>
				<a-slider id="test" v-model:value="progress" :min="min" :max="max" :disabled="max === 0" :tip-formatter="toTimeString" @afterChange="rewind" />
				<div class="progress-info">
					<a-typography-text :disabled="max === 0">{{ toTimeString(progress) }}</a-typography-text>
					<a-typography-text :disabled="max === 0">{{ toTimeString(max) }}</a-typography-text>
				</div>
			</div>
		</div>
		<div v-else class="minimized-layout">
			<a-button type="text" shape="circle" size="large" @click="toggleSize">
				<template #icon>
					<ArrowLeftOutlined />
				</template>
			</a-button>
			<a-button shape="circle" size="large" class="player-button" @click="togglePlay">
				<template #icon>
					<PauseCircleFilled v-if="isPlaying" />
					<PlayCircleFilled v-else />
				</template>
			</a-button>
		</div>
	</a-card>
</template>

<style scoped>
.audioplayer {
	min-width: 20rem;
	width: 20rem;
	max-width: 20rem;
	min-height: 10rem;
	height: 10rem;
	max-height: 10rem;
	position: fixed;
	bottom: 3rem;
	z-index: 200;
	box-shadow: 0px 0px 50px 0px rgba(163, 163, 163, 1);
	transition: all 0.5s ease-out allow-discrete;
}

.maximized {
	right: 3rem;
}

.minimized {
	right: -15rem
}

.minimized-layout {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 1rem;
}

.player-button {
	padding: 0 !important;
	font-size: 1.75rem;
}

.player-button > span {
	display: block !important;
}

.yt {
	position: absolute;
	top: 0px;
	left: 0px;
}

.story-info {
	flex: 1;
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

.maximized-layout {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 2rem;
	margin-bottom: 1rem;
}
</style>