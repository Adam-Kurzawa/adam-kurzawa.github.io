<script setup>
import { useTranslation } from '@/utils/hooks';
import Panel from './Panel.vue'

const t = useTranslation()
</script>

<template>
  <Panel class="ad">
    <div>
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
</style>