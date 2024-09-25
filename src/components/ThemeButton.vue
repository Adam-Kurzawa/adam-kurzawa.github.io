<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)
</script>

<template>
    <div class="theme-button" :class="themeStore.secondaryBackgroundColor" @click="themeStore.toggle">
        <div class="theme-button-icon-wrapper" :class="{ 'theme-button-icon-wrapper-selected': currentTheme == 'light' }">
            <img class="theme-button-icon" :class="{ 'theme-button-icon-selected': currentTheme == 'light' }" src="../assets/light.svg" />
        </div>
        <div class="theme-button-icon-wrapper" :class="{ 'theme-button-icon-wrapper-selected': currentTheme == 'sepia' }">
            <img class="theme-button-icon" :class="{ 'theme-button-icon-selected': currentTheme == 'sepia' }" src="../assets/sepia.svg" />
        </div>
        <div class="theme-button-icon-wrapper" :class="{ 'theme-button-icon-wrapper-selected': currentTheme == 'dark' }">
            <img class="theme-button-icon" :class="{ 'theme-button-icon-selected': currentTheme == 'dark' }" src="../assets/dark.svg" />
        </div>
    </div>
</template>

<style scoped>
.theme-button {
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
    cursor: pointer;
    transition: all 0.5s ease;
}

.theme-button:hover {
    background-color: rgb(165, 165, 165);
}

.theme-button-icon-wrapper {
    border-radius: 0.5rem;
    height: -webkit-fill-available;
}

.theme-button-icon-wrapper-selected {
    background-color: darkgoldenrod;
}

.theme-button-icon {
    filter: invert(0%) sepia(7%) saturate(7489%) hue-rotate(296deg) brightness(91%) contrast(100%);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    width: 1rem;
    padding-top: 0.65rem;
}

.theme-button-icon-selected {
    filter: invert(100%) sepia(1%) saturate(0%) hue-rotate(214deg) brightness(102%) contrast(100%);
}
</style>