<script setup>
import { onUnmounted, ref } from 'vue'
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue'
import AudioPlayerMinimize from './AudioPlayerMinimize.vue'
import AudioPlayerMaximize from './AudioPlayerMaximize.vue'
import AudioPlayerSlider from './AudioPlayerSlider.vue'
import { useYouTube } from '../hooks/useYouTube'
import { useAudioStore } from '@/stores/audio'
import AudioPlayerPlaybackInfo from './AudioPlayerPlaybackInfo.vue'
import AudioPlayerHeader from './AudioPlayerHeader.vue'

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
	<div class="audioplayer p-8 fixed right-6 bottom-6 z-[200] bg-white rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] translate-x-0 opacity-100" :class="[ isMinimized ? 'minimized' : 'maximized' ]">
		<div v-if="isMinimized" class="minimized-layout">
			<AudioPlayerMaximize @show="onShow" />
			<AudioPlayerPlaybackControls :state="state" @play="onPlay" @pause="onPause" />
		</div>
		<div v-else>
			<div class="maximized-layout">
				<AudioPlayerHeader />
				<AudioPlayerMinimize @hide="onHide" />
			</div>
			<AudioPlayerPlaybackInfo :series="audioStore.series" :title="title" />
			<AudioPlayerSlider v-model="progress" :duration="duration" @seekto="onSeekTo" />
			<AudioPlayerPlaybackControls :state="state" @play="onPlay" @pause="onPause" />
		</div>
	</div>
</template>

<style scoped>
.audioplayer {
	min-width: 30rem;
	width: 30rem;
	max-width: 30rem;
	box-shadow: 0px 0px 30px 0px rgba(163, 163, 163, 0.5);
}

.maximized {
	right: 3rem;
	min-height: 22rem;
	height: 22rem;
	max-height: 22rem;
}

.minimized {
	right: -24rem;
	min-height: 10rem;
	height: 10rem;
	max-height: 10rem;
}

.minimized-layout {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	gap: 1rem;
}

.maximized-layout {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	gap: 1rem;
	margin-bottom: 1rem;
	align-items: center;
}
</style>