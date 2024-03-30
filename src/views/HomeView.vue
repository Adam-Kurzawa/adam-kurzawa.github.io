<script setup>
import Welcome from "@/components/Welcome.vue";
import BookAd from "@/components/BookAd.vue";
</script>

<template>
  <main>
    <div class="welcome-container">
      <Welcome/>
    </div>
    <BookAd />
  </main>
</template>

<style scoped>
.welcome-container {
  display: flex; 
  justify-content: center;
  margin-bottom: 2rem;
}
</style>