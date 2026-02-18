<script setup>
import { useTranslation } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
    <section class="bg-red-900 py-24">
        <div class="max-w-7xl mx-auto px-6">
            <img :src="`/doktryna_solarna_${themeStore.currentTheme}.png`" class="doktryna_solarna" />
        </div>
    </section>
</template>