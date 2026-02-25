import { nextTick, onMounted, ref } from 'vue';

export function useYouTube() {
	const youTubePlayer = ref()
	const title = ref()
	const state = ref(-1)
	const duration = ref(0)

	const loadYouTubeIframeAPI = () => {
		return new Promise((resolve) => {
			if (window.YT && window.YT.Player) {
				console.debug('YouTube scripts already present')
				resolve()
			} 
			
			window.onYouTubeIframeAPIReady = () => {
				console.debug('YouTube scripts loaded')
				resolve()
			}

			if (!document.getElementById('youtube-iframe-script')) {
				console.debug('Creating script')
				const tag = document.createElement('script')
				tag.src = 'https://www.youtube.com/iframe_api'
				tag.id = 'youtube-iframe-script'
				document.body.appendChild(tag)
				console.debug('Created script')
			}
		})
	}
	
	const onPlayerReady = () => {
		console.debug('YouTube player ready')
	}

	const onChanged = (event) => {
		title.value = event.target.videoTitle
		state.value = event.data
		duration.value = event.target.getDuration()
	}

	onMounted(async () => {
		await loadYouTubeIframeAPI()
		await nextTick()

		youTubePlayer.value = new YT.Player('ytplayer', {
			height: '0',
			width: '0',
			events: {
				onReady: onPlayerReady,
				onStateChange: onChanged
			}
		})
	})

	return {
		youTubePlayer,
		state,
		title,
		duration
	}
}
