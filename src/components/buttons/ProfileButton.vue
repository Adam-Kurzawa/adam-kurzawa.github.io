<script setup>
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const props = defineProps([ 'header', "description", 'image', 'action' ])

const themeStore = useThemeStore()

const base = import.meta.env.BASE_URL

const imgSource = computed(() => `${base}${props.image}`)
const profileButtonBorder = computed(() => `profile-button-${themeStore.currentTheme}`)
</script>

<template>
    <button class="profile-button" :class="profileButtonBorder" @click="props.action">
        <img class="profile-button-icon font-segoe" :src="imgSource" />
        <div class="profile-button-label font-segoe">
          <span class="profile-button-header">{{ props.header }}</span>
          <span class="profile-button-description">@{{ props.description }}</span>
        </div>
    </button>
</template>

<style scoped>
.profile-button-icon {
  width: 3rem;
  height: auto;
}

.profile-button-light {
  border-color: darkslategray;
  color: darkslategray;
}

.profile-button-sepia {
  border-color: darkslategray;
  color: darkslategray;
}

.profile-button-dark {
  border-color: #9d9d9d;
  color: #9d9d9d;
}

.profile-button-label {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem;
}

.profile-button-header {
  font-size: 1rem;
  font-weight: bold;
}

.profile-button-description {
  font-size: 1rem;
}

.profile-button {
  background-color: transparent;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  align-items: center;
}

.profile-button:hover {
  color: darkgoldenrod;
  border-color: darkgoldenrod;
  cursor: pointer;
}
</style>