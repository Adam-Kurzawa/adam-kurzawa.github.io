<script setup>
import { useTemplateRef, onMounted, onUnmounted } from 'vue';
import 'altcha'
import { theme } from 'ant-design-vue'
import { useTranslation } from '@/utils/hooks'

const emit = defineEmits([ 'verified' ])
const t = useTranslation()

const altchaWidget = useTemplateRef('altcha-widget')

const { useToken } = theme
const { token } = useToken()

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
    <altcha-widget ref="altcha-widget" challengeurl="http://localhost:8080/challenge" :strings="JSON.stringify({ label: t('altcha.label') })" :style="`--altcha-color-border: ${token.colorBorder}; --altcha-border-radius: 6px; --altcha-max-width: 100%;`"></altcha-widget>
</template>