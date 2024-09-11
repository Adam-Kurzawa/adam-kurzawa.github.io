<script setup>
import Welcome from "@/components/Welcome.vue";
import BookAd from "@/components/BookAd.vue";
import WorkInProgress from "@/components/WorkInProgress.vue";
</script>

<template>
  <main>
    <Welcome />
    <div class="welcome-container">
      <BookAd style="grid-area: a;" />
      <WorkInProgress class="temp" style="grid-area: b;" />
      <WorkInProgress class="temp" style="grid-area: c;" />
      <WorkInProgress class="temp" style="grid-area: d;" />
      <WorkInProgress class="temp" style="grid-area: e;" />
      <WorkInProgress class="temp" style="grid-area: f;" />
      <WorkInProgress class="temp" style="grid-area: g;" />
    </div>
  </main>
</template>

<style scoped>
.welcome-container {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
  grid-template-columns: minmax(0, 25%) minmax(0, 25%) minmax(0, 25%) minmax(0, 25%);
  grid-template-areas:
      "a a b b"
      "a a c d"
      "e f g g";
}

.temp {
  box-shadow: 0 0 2rem gainsboro;
  background-color: silver;
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
