import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', {
    state: () => {
        return {
            ytVideoId: null,
            _series: null,
            _cover: null
        }
    },
    getters: {
        youTubeVideoId: (state) => state.ytVideoId,
        series: (state) => state._series,
        cover: (state) => state._cover
    },
    actions: {
        setAudioBook(ytVideoId, series, cover) {
            this.ytVideoId = ytVideoId
            this._series = series
            this._cover = cover
        }
    }
})