import { onMounted, ref } from 'vue';

export function useYouTube(iframeId) {
	const ytPlayer = ref()

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
		ytPlayer.value = new YT.Player(iframeId)
	})

	return ytPlayer
}


