<script setup>
import { computed } from 'vue';

const props = defineProps(['rounded'])

const style = computed(() => {
  const borderRadius = props.rounded === 'true' ? { 'border-radius': '0.5rem' } : {}
  
  return {
    ...borderRadius
  }
})
</script>

<template>
  <div class="white-panel" :style="style">
    <slot></slot>
  </div>
</template>

<style scoped>
.white-panel {
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: rgba(255, 255, 255, 1.0);
}

@media screen and (max-width: 1600px) {
  .white-panel {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media screen and (max-width: 1280px) {
  .white-panel {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media screen and (max-width: 1024px) {
  .white-panel {
    border-radius: 0 !important;
  }
}
</style>