<script setup>
import { useThemeStore } from '@/stores/theme'
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
  <div class="footer" :class="[themeStore.secondaryBackgroundColor, themeStore.primaryTextColor]">
    <div class="copyrights font-segoe">&copy; {{ t("copyrights.arr") }}</div>
    <div class="copyrights analytics font-segoe">&copy; {{ t("copyrights.cookies") }}</div>
  </div>
</template>

<style scoped>
.footer {
  padding: 2rem;
  padding-bottom: 4rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  gap: 1rem;
}

.copyrights {
  text-align: center;
}

.analytics {
  font-size: 0.85rem;
}

@media screen and (max-width: 1024px) {
  .footer {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
