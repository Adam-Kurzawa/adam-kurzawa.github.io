<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
  <div class="work-in-progress">
    <img src="@/assets/wip.png" class="work-in-progress-roadblock" />
    <div class="work-in-progress-text font-segoe">{{ t('work-in-progress') }}</div>
  </div>
</template>

<style scoped>
.work-in-progress {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.work-in-progress-text {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: gray;
  margin-top: 2rem;
  align-self: center;
}

.work-in-progress-roadblock {
  height: auto;
  width: 15rem;
  align-self: center;
}
</style>