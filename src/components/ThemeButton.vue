<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { EyeOutlined, EyeFilled } from '@ant-design/icons-vue'

const themeStore = useThemeStore()
const state = ref(themeStore.currentTheme === 'light');

const toggle = () => {
    themeStore.toggle()

    document.getElementById('highlight-js-theme').href = themeStore.isLightTheme
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
}
</script>

<template>
    <a-switch v-model:checked="state" @click="toggle" :style="{ marginTop: '0.6rem' }">
        <template #checkedChildren><EyeOutlined /></template>
        <template #unCheckedChildren><EyeFilled /></template>
    </a-switch>
</template>
