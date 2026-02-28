<script setup>
import { onUnmounted, ref } from 'vue'
import AudioPlayerPlaybackControls from './AudioPlayerPlaybackControls.vue'
import AudioPlayerMinimize from './AudioPlayerMinimize.vue'
import AudioPlayerMaximize from './AudioPlayerMaximize.vue'
import AudioPlayerSlider from './AudioPlayerSlider.vue'
import { useYouTube } from '@/utils/useYouTube'
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
	<div v-if="isMinimized" class="flex flex-col gap-[1.5rem] absolute shadow-2xl border border-slate-200 p-8 fixed right-[-1rem] pr-[2rem] bottom-6 z-[200] bg-white rounded-[1rem]">
		<AudioPlayerMaximize @show="onShow" />
		<AudioPlayerPlaybackControls :state="state" @play="onPlay" @pause="onPause" />
	</div>
	<div v-else class="flex flex-col absolute shadow-2xl border border-slate-200 p-8 fixed right-6 bottom-6 z-[200] bg-white rounded-[1rem]">
		<div class="flex flex-row justify-between gap-[1rem] mb-[1rem] items-center w-[30rem]">
			<AudioPlayerHeader />
			<AudioPlayerMinimize @hide="onHide" />
		</div>
		<AudioPlayerPlaybackInfo :series="audioStore.series" :cover="audioStore.cover" :title="title" :state="state" @play="onPlay" @pause="onPause" />
		<AudioPlayerSlider v-model="progress" :duration="duration" @seekto="onSeekTo" />
	</div>
</template>
