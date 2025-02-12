<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
  <div class="footer">
    <a-typography-text>&copy; {{ t("copyrights.arr") }}</a-typography-text>
    <a-typography-text>&copy; {{ t("copyrights.cookies") }}</a-typography-text>
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
  text-align: center;
}

@media screen and (max-width: 1024px) {
  .footer {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
