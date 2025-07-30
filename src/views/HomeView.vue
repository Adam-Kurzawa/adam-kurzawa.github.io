<script setup>
import { useTranslation } from '@/utils/hooks'
import BukoweCard from '@/components/BukoweCard.vue'
import AlternataCard from '../components/AlternataCard.vue'
import WelcomeCard from '@/components/WelcomeCard.vue'
import EgzorcyzmyCard from '@/components/EgzorcyzmyCard.vue'
import Spotlight from '@/components/Spotlight.vue'

const t = useTranslation()
</script>

<template>
  <main class="welcome-container">
    <WelcomeCard />
    <Spotlight />
    <AlternataCard />
    <a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="title">Inne wydania</a-typography-title>
    <!--<div class="bottom-ads">-->
    <!--  <EgzorcyzmyCard />-->
    <!--  <BukoweCard />-->
    <!--</div>-->
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

@media screen and (max-width: 1024px) {
  .welcome-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
