import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
    state: () => {
        return {
            ytVideoId: null,
            _series: null
        }
    },
    getters: {
        youTubeVideoId: (state) => state.ytVideoId,
        series: (state) => state._series
    },
    actions: {
        setAudioBook(ytVideoId, series) {
            this.ytVideoId = ytVideoId
            this._series = series
        }
    }
})