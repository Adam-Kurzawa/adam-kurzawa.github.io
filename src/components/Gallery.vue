<script setup>
import { computed, ref } from 'vue';
import CloseIcon from './icons/CloseIcon.vue';
import ShortArrowLeftIcon from './icons/ShortArrowLeftIcon.vue';
import ShortArrowRightIcon from './icons/ShortArrowRightIcon.vue';
import IconButton from './system/IconButton.vue';
import { useGalleryStore } from '@/stores/gallery';

const galleryStore = useGalleryStore()
const currentIndex = ref(0)

const showNext = () => {
    const next = currentIndex.value + 1

    if (next == galleryStore.images.length)
        currentIndex.value = 0
    else
        currentIndex.value = next
}

const showPrevious = () => {
    const prev = currentIndex.value - 1

    if (prev == -1)
        currentIndex.value = galleryStore.images.length - 1
    else
        currentIndex.value = prev
}

const close = () => {
    currentIndex.value = 0
    galleryStore.clear()
}

const showSelected = (index) => {
    currentIndex.value = index
}
</script>

<template>
    <div :hidden="galleryStore.hasNoImages" class="fixed inset-0 top-0 left-0 bg-neutral-900/20 backdrop-blur-lg w-full h-dvh z-[900] p-6 flex flex-col gap-6">
        <div class="flex flex-row items-center w-full h-[90%] gap-6">
            <div class="flex-1">
                <IconButton @click="showPrevious">
                    <ShortArrowLeftIcon size="64" />
                </IconButton>
            </div>
            <div class="h-full">
                <img class="h-full object-contain" :src="galleryStore.images[currentIndex]" />
            </div>
            <div class="flex-1 h-full flex flex-col items-end justify-between">
                <div>
                    <IconButton @click="close">
                        <CloseIcon size="64" />
                    </IconButton>
                </div>
                <div>
                    <IconButton @click="showNext">
                        <ShortArrowRightIcon size="64" />
                    </IconButton>
                </div>
                <div></div>
            </div>
        </div>
        <div class="flex flex-row w-full gap-2">
            <img v-for="(image, index) in galleryStore.images" :src="image" @click="showSelected(index)" class="cursor-pointer w-20 h-20 object-scale-down bg-neutral-900/25 rounded-[0.5rem]" />
        </div>
    </div>
</template>
