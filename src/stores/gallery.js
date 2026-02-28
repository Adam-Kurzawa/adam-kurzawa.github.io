import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', {
    state: () => {
        return {
            images: [
                '/bukowe_widziadlo.jpg'
            ]
        }
    },
    getters: {
        getImages: (state) => state.images,
        hasImages: (state) => state.images.length > 0
    },
    actions: {
        open(images) {
            this.images = images
        },
        clear() {
            this.images = []
        }
    }
})