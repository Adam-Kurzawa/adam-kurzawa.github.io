<script setup>
import Welcome from '@/components/Welcome.vue'
import BookAd from '@/components/BookAd.vue'
import { useTranslation } from '@/utils/hooks'
import FantazmatyAd from '@/components/FantazmatyAd.vue'
import OpowiesciSiakaAd from '@/components/OpowiesciSiakaAd.vue';

const t = useTranslation()
</script>

<template>
  <main class="welcome-container">
    <Welcome />
    <BookAd />
    <div class="tempppp">
      <FantazmatyAd />
      <OpowiesciSiakaAd />
    </div>
  </main>
</template>

<style scoped>
.welcome-container {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.tempppp {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 2rem;
}
</style>
