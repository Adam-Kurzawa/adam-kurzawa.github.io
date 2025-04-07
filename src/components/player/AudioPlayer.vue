<script setup>
import { onUnmounted, ref } from 'vue';
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue';
import AudioPlayerMinimize from './AudioPlayerMinimize.vue';
import AudioPlayerMaximize from './AudioPlayerMaximize.vue';
import { useYouTube } from '../hooks/useYouTube';
import AudioPlayerSlider from './AudioPlayerSlider.vue';

const ytPlayer = useYouTube('ytplayer')

const isPlaying = ref(false)
const isMinimized = ref(true)
const max = ref(0)
const progress = ref(0)
let interval = null

const addInterval = () => {
	interval = setInterval(() => {
		progress.value = ytPlayer.value.getCurrentTime()

		if(ytPlayer.value.getPlayerState() === 0) {
			removeInterval()
			progress.value = ytPlayer.value.getDuration()
			isPlaying.value = false
		}
	}, 500)
}

const removeInterval = () => {
	if(interval)
		window.clearInterval(interval)
}

const onPlay = () => {
	isPlaying.value = true
	ytPlayer.value.playVideo()
	addInterval()
	max.value = ytPlayer.value.getDuration()
	progress.value = ytPlayer.value.getCurrentTime()
}

const onPause = () => {
	isPlaying.value = false
	ytPlayer.value.pauseVideo()
	removeInterval()
}

const onSeekTo = (value) => {
	ytPlayer.value.seekTo(value)
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
</script>

<template>
	<a-card class="audioplayer" :class="[ isMinimized ? 'minimized' : 'maximized' ]">
		<iframe id="ytplayer" width="0" height="0" class="yt" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=KFE4j8Wxj0xsZqHO?rel=0&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		<div v-if="!isMinimized">
			<div class="maximized-layout">
				<AudioPlayerPlaybackControls :is-playing="isPlaying" @play="onPlay" @pause="onPause" />
				<div class="story-info">
					<a-typography-text type="secondary">Deus Vult</a-typography-text>
					<a-typography-text strong>Bukowe Widziadło</a-typography-text>
				</div>
				<AudioPlayerMinimize @hide="onHide" />
			</div>
			<AudioPlayerSlider v-model="progress" :duration="max" @seekto="onSeekTo" />
		</div>
		<div v-else class="minimized-layout">
			<AudioPlayerMaximize @show="onShow" />
			<AudioPlayerPlaybackControls :is-playing="isPlaying" @play="onPlay" @pause="onPause" />
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
	gap: 1rem;
	margin-bottom: 1rem;
}
</style>