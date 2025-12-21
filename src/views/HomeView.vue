<script setup>
import { useTranslation } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'
import BukoweCard from '@/components/BukoweCard.vue'
import AlternataCard from '../components/AlternataCard.vue'
import WelcomeCard from '@/components/WelcomeCard.vue'
import EgzorcyzmyCard from '@/components/EgzorcyzmyCard.vue'
import Spotlight from '@/components/Spotlight.vue'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
  <main class="welcome-container">
    <WelcomeCard />
    <Spotlight />
    <AlternataCard />
    <img :src="`/doktryna_solarna_${themeStore.currentTheme}.png`" class="doktryna_solarna" />
    <div :style="{ height: '10rem', backgroundColor: 'beige' }"></div>
    <a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="title">Inne wydania</a-typography-title>
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

.doktryna_solarna {
  margin-top: 2rem;
  width: 60%;
  height: auto;
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
