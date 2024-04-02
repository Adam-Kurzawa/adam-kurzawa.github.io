<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="content">
    <RouterView :key="$route.fullPath"/>  
  </div>
</template>

<style scoped>
.content {
  transition: padding 0.5s ease;
  margin-top: 10rem;
  margin-bottom: 5rem;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1920px) {
  .content {
    padding-left: 12rem;
    padding-right: 12rem;
  }
}

@media screen and (max-width: 1600px) {
  .content {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}

@media screen and (max-width: 1280px) {
  .content {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 1024px) {
  .content {
    margin-top: 5rem;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>