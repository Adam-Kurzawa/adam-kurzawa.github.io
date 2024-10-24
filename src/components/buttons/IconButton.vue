<script setup>
import { computed } from 'vue';

const props = defineProps([ 'text', 'image' ])

const base = import.meta.env.BASE_URL

const imgSource = computed(() => `${base}${props.image}`)
</script>

<template>
    <button class="icon-button">
        <img class="icon-button-icon font-segoe" :src="imgSource" />
        <span class="icon-button-label font-segoe">{{ props.text }}</span>
    </button>
</template>

<style scoped>
.icon-button-icon {
  width: 1rem;
  height: auto;
  filter: invert(28%) sepia(8%) saturate(1633%) hue-rotate(131deg) brightness(93%) contrast(92%);
}

.icon-button-label {
  font-size: 1rem;
}

.icon-button {
  background-color: transparent;
  border-radius: 0.5rem;
  border: 1px solid darkslategray;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  align-items: center;
}

.icon-button:hover {
  color: darkgoldenrod;
  border-color: darkgoldenrod;
}

.icon-button:hover .icon-button-icon {
  filter: invert(47%) sepia(100%) saturate(411%) hue-rotate(5deg) brightness(94%) contrast(94%);
}
</style>