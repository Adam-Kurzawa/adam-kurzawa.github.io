<script setup>
import { useThemeStore } from '@/stores/theme'
import { computed } from 'vue';

const props = defineProps([ 'title' ])

const themeStore = useThemeStore()

const btnGroupChild = computed(() => `btn-group-child-${themeStore.currentTheme}`)
</script>

<template>
  <div class="btn-group" :class="[ btnGroupChild, props.title ? 'btn-group-with-title' : 'btn-group-without-title' ]">
    <span v-if="props.title" class="btn-group-title" :class="themeStore.primaryTextColor">{{ props.title }}</span>
    <slot></slot>
  </div>
</template>

<style>
.btn-group {
  width: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
}

.btn-group > * {
  border: none;
  margin-left: 0;
  margin-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  padding-left: 0.5rem;
  background: none;
  text-decoration: none;
  outline: none;
  align-content: center;
  text-align: center;
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif !important;
  font-size: 0.85rem;
  transition: all 0.5s ease;
}

.btn-group > *::after {
  content: "";
  border-right-width: 1px;
  border-right-style: solid;
  padding-left: 0.5rem;
}

.btn-group-child-light {
  border-color: gainsboro;
}

.btn-group-child-light > *::after {
  border-right-color: gainsboro;
}

.btn-group-child-sepia {
  border-color: #97c9a3;
}

.btn-group-child-sepia > *::after {
  border-right-color: #97c9a3;
}

.btn-group-child-dark {
  border-color: rgb(112, 112, 112);
}

.btn-group-child-dark > *::after {
  border-right-color: rgb(112, 112, 112);
}

.btn-group :first-child {
  border-bottom-left-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}

.btn-group :last-child {
  border-bottom-right-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.btn-group :last-child::after {
  border-right: none;
}

.btn-group-with-title > :not(:first-child):hover {
  background-color: darkgoldenrod;
}

.btn-group-without-title > *:hover {
  background-color: darkgoldenrod;
}

.btn-group-title {
  font-weight: bold;
}
</style>
