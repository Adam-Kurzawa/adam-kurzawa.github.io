<script setup>
import { useTranslation } from '@/utils/hooks';
import Panel from './Panel.vue'

const t = useTranslation()
</script>

<template>
  <Panel class="ad" rounded="true">
    <div>
      <div class="h1 font-josefin">O mnie</div>
      <div class="font-segoe">Lorem ipsum dolor et sadorem vitinius sandis. Et cetore pan vardis que mono.</div>
      <div class="font-segoe">Kontakt</div>
      <div class="font-segoe">zzz.xxx@gmail.com</div>
      <div class="font-segoe">nowafantastyka.pl</div>
      <div class="font-segoe">wattpad</div>
      <div class="font-segoe">medium</div>
    </div>
    <img src="@/assets/ENG.png" />
  </Panel>
</template>

<style scoped>
.ad {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 2rem;
}

.h1 {
  font-style: normal;
  font-weight: 600;
  font-size: 4rem;
  color: #e69b54;
  text-align: center;
  text-transform: uppercase;
}
</style>