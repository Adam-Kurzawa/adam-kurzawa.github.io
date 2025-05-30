<script setup>
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue'
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue'
import AudioPlayerMinimize from './AudioPlayerMinimize.vue'
import AudioPlayerMaximize from './AudioPlayerMaximize.vue'
import AudioPlayerSlider from './AudioPlayerSlider.vue'
import { useYouTube } from '../hooks/useYouTube'
import { useAudioStore } from '@/stores/audio'

const { youTubePlayer, state, title, duration } = useYouTube()
const audioStore = useAudioStore()

const isMinimized = ref(true)
const progress = ref(0)

let interval = null

const addInterval = () => {
	interval = setInterval(() => {
		progress.value = youTubePlayer.value.getCurrentTime()

		if(youTubePlayer.value.getPlayerState() === 0) {
			removeInterval()
			progress.value = ytPlayer.value.getDuration()
		}
	}, 500)
}

const removeInterval = () => {
	if(interval)
		window.clearInterval(interval)
}

const onPlay = () => {
	youTubePlayer.value.playVideo()
	addInterval()
	progress.value = youTubePlayer.value.getCurrentTime()
}

const onPause = () => {
	youTubePlayer.value.pauseVideo()
	removeInterval()
}

const onSeekTo = (value) => {
	youTubePlayer.value.seekTo(value)
}

const onHide = () => {
	isMinimized.value = true
}

const onShow = () => {
	isMinimized.value = false
}

onUnmounted(() => {
	removeInterval()
})

audioStore.$onAction(({ args }) => {
	youTubePlayer.value.pauseVideo()

	youTubePlayer.value.cueVideoById(
		{
			videoId: args[0],
			startSeconds: 0
		}
	)

	isMinimized.value = false
})
</script>

<template>
	<a-card class="audioplayer" :class="[ isMinimized ? 'minimized' : 'maximized' ]">
		<div v-if="!isMinimized">
			<div class="maximized-layout">
				<AudioPlayerPlaybackControls :state="state" @play="onPlay" @pause="onPause" />
				<div class="story-info">
					<a-typography-text type="secondary">{{ audioStore.series ?? '-' }}</a-typography-text>
					<a-typography-text strong :ellipsis="{ expandable: false, tooltip: false, rows: 1 }" :style="{ minWidth: '10.5rem', maxWidth: '10.5rem' }">{{ title ?? '-' }}</a-typography-text>
				</div>
				<AudioPlayerMinimize @hide="onHide" />
			</div>
			<AudioPlayerSlider v-model="progress" :duration="duration" @seekto="onSeekTo" />
		</div>
		<div v-else class="minimized-layout">
			<AudioPlayerMaximize @show="onShow" />
			<AudioPlayerPlaybackControls :state="state" @play="onPlay" @pause="onPause" />
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
	gap: 1rem;
	margin-bottom: 1rem;
	align-items: center;
}
</style>