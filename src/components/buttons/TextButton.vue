<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'text', 'action', 'disabled' ])
const themeStore = useThemeStore()
</script>

<template>
    <button 
        class="text-button font-segoe"
        :class="[ themeStore.buttonFillColor, themeStore.buttonTextColor ]" 
        @click="props.action"
        :disabled="props.disabled ? props.disabled : false"
    >{{ props.text }}</button>
</template>

<style scoped>
.text-button {
  border-radius: 0.5rem;
  border: none;
  font-size: 0.85rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: fit-content;
  font-weight: lighter;
  cursor: pointer;
  align-content: center;
}

.text-button:disabled:hover { 
  background-color: rgb(0, 180, 180);
}

.text-button:disabled {
  background-color: rgb(0, 180, 180);
}

.text-button:hover {
  background-color: darkgoldenrod;
}
</style>