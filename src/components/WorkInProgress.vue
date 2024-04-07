<script setup>
import { useTranslation } from '@/utils/hooks';
import Panel from "./Panel.vue";

const t = useTranslation()
</script>

<template>
  <Panel rounded="true">
    <div class="flex">
      <img src="@/assets/wip.png" class="roadblock" />
      <div class="wip font-segoe">{{ t('work-in-progress') }}</div>
    </div>
  </Panel>
</template>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

.wip {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  margin-left: 10rem;
  margin-right: 10rem;
}

.roadblock {
  max-height: 15rem;
  margin-left: 10rem;
  margin-right: 10rem;
}
</style>