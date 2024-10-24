<script setup>
import H1 from '@/components/headers/H1.vue'

const props = defineProps([ 'text' ])
</script>

<template>
  <div class="h0">
    <H1 class="h0-text" :text="props.text" colorful="true" />
    <div class="h0-separators"></div>
    <img class="h0-background" src="../../assets/full_symbol.svg" />
  </div>
</template>

<style scoped>
.h0-text {
  z-index: 1;
}

.h0-separators {
  width: 100%;
  border-bottom: 1px solid #b8860b;
  position: absolute;
  opacity: 0.15;
}

.h0-background {
  width: 10rem;
  opacity: 0.15;
  position: absolute;
  filter: invert(48%) sepia(85%) saturate(490%) hue-rotate(5deg) brightness(93%) contrast(91%);
}

.h0 {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 4rem;
}
</style>