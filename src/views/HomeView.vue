<script setup>
import Welcome from "@/components/Welcome.vue";
import BookAd from "@/components/BookAd.vue";
import WorkInProgress from "@/components/WorkInProgress.vue";
</script>

<template>
  <main>
    <div class="welcome-container">
      <Welcome style="grid-area: a;" />
      <BookAd style="grid-area: b;" />
      <WorkInProgress class="temp" style="grid-area: c;" />
      <WorkInProgress class="temp" style="grid-area: d;" />
      <WorkInProgress class="temp" style="grid-area: e;" />
      <WorkInProgress class="temp" style="grid-area: f;" />
      <WorkInProgress class="temp" style="grid-area: g;" />
      <WorkInProgress class="temp" style="grid-area: h;" />
    </div>
  </main>
</template>

<style scoped>
.welcome-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas:
      "a a a a"
      "b b c d"
      "e f g h";
}

.temp {
  box-shadow: 0 0 2rem gainsboro;
  background-color: beige;
  padding: 2rem;
}

@media screen and (max-width: 1024px) {
  .welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
  }
}
</style>
