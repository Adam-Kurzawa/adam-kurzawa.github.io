<script setup>
import { useTemplateRef, onMounted, onUnmounted, computed } from 'vue';
import 'altcha'
import { useTranslation } from '@/utils/hooks'

const emit = defineEmits([ 'verified' ])
const t = useTranslation()

const altchaWidget = useTemplateRef('altcha-widget')

const challengeUrl = computed(() => import.meta.env.VITE_ALTERNATA_BFF_HOST + '/challenge')

const onStateChange = (ev) => {
    if ('detail' in ev) {
        const { payload, state } = ev.detail;

        if (state === 'verified' && payload)
            emit('verified', payload)
    }
}

onMounted(() => {
    if(altchaWidget.value)
        altchaWidget.value.addEventListener('statechange', onStateChange)
})

onUnmounted(() => {
    if(altchaWidget.value)
        altchaWidget.value.removeEventListener('statechange', onStateChange)
})
</script>

<template>
    <altcha-widget ref="altcha-widget" :challengeurl="challengeUrl" :strings="JSON.stringify({ label: t('altcha.label') })" :style="`--altcha-color-border: oklch(92.9% 0.013 255.508); --altcha-border-radius: 1rem; --altcha-max-width: 100%;`"></altcha-widget>
</template>