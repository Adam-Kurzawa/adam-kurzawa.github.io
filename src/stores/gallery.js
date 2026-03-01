import { defineStore } from 'pinia'

export const useGalleryStore = defineStore('gallery', {
    state: () => {
        return {
            _images: []
        }
    },
    getters: {
        images: (state) => state._images,
        hasNoImages: (state) => state._images.length === 0
    },
    actions: {
        open(images) {
            this._images = images
        },
        clear() {
            this._images = []
        }
    }
})