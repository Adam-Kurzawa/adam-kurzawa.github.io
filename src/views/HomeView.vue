<script setup>
import { useTranslation } from '@/utils/hooks'
import BukoweCard from '@/components/BukoweCard.vue'
import AlternataCard from '../components/AlternataCard.vue'
import WelcomeCard from '@/components/WelcomeCard.vue'
import EgzorcyzmyCard from '@/components/EgzorcyzmyCard.vue'

const t = useTranslation()
</script>

<template>
  <main class="welcome-container">
    <WelcomeCard />
    <AlternataCard />
    <div class="bottom-ads">
      <EgzorcyzmyCard />
      <BukoweCard />
    </div>
  </main>
</template>

<style scoped>
.welcome-container {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.bottom-ads {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 50%));
  gap: 2rem;
}

@media screen and (max-width: 1440px) {
  .bottom-ads {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
