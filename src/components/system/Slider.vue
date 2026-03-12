<script setup>
import { useToggle } from '@vueuse/core';
import { computed, ref } from 'vue';

const emit = defineEmits([ 'change' ])
const props = defineProps({
    max: Number,
    value: Number,
    format: Function
})

const hoverProgress = ref(0)
const hoverProgressPercent = ref(0)
const [ hideHoverProgress, toggleHoverProgress ] = useToggle(true)

function getRatio(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    return Math.min(Math.max(x / rect.width, 0), 1)
}

const onClick = (event) => {
    emit('change', getRatio(event) * props.max)
}

const onHover = (event) => {
    const ratio = getRatio(event)
    hoverProgress.value = ratio
    hoverProgressPercent.value = Math.floor(ratio * 100)
    toggleHoverProgress(false)
}

const onLeave = () => {
    hoverProgress.value = 0
    hoverProgressPercent.value = 0
    toggleHoverProgress(true)
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="relative w-full top-[-1.5rem]">
            <p class="text-slate-600 text-base font-semibold absolute" :class="[ hideHoverProgress ? 'text-transparent' : '' ]" :style="{ left: `calc(${hoverProgressPercent}% - 1.25rem)` }">{{ props.format(hoverProgress * props.max) }}</p>
        </div>
        <div class="h-[0.4rem] relative w-full bg-slate-300 rounded-full cursor-pointer" @mousemove="onHover" @mouseleave="onLeave" @click="onClick">
            <div class="absolute h-full bg-indigo-500 rounded-full z-200 transition-all" :style="{ width: `${Math.floor(props.value / props.max * 100)}%` }"></div>
            <div class="absolute h-full bg-slate-500 rounded-full z-199" :style="{ width: `${hoverProgressPercent}%` }"></div>
        </div>
        <div class="flex flex-row justify-between">
            <p class="text-slate-600 text-base font-semibold">{{ props.format(props.value) }}</p>
            <p class="text-slate-600 text-base font-semibold">{{ props.format(props.max) }}</p>
        </div>
    </div>
</template>