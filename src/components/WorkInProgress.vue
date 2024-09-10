<script setup>
import { useTranslation } from '@/utils/hooks';
import Panel from "./Panel.vue";

const t = useTranslation()
</script>

<template>
  <div class="flex">
    <img src="@/assets/wip.png" class="roadblock" />
    <div class="wip font-segoe">{{ t('work-in-progress') }}</div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.wip {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: gray;
  margin-top: 2rem;
  align-self: center;
}

.roadblock {
  height: auto;
  width: 15rem;
  align-self: center;
}
</style>