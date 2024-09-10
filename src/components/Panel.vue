<script setup>
const props = defineProps(['rounded'])
</script>

<template>
  <div class="white-panel">
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
  box-shadow: 0 0 2rem gainsboro;
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
</style>