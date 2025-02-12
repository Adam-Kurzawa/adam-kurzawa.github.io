<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { EyeOutlined, EyeFilled } from '@ant-design/icons-vue'

const themeStore = useThemeStore()
const state = ref(themeStore.currentTheme == 'light');
</script>

<template>
    <a-switch v-model:checked="state" @click="themeStore.toggle" :style="{ marginTop: '0.6rem' }">
        <template #checkedChildren><eye-outlined /></template>
        <template #unCheckedChildren><eye-filled /></template>
    </a-switch>
</template>
