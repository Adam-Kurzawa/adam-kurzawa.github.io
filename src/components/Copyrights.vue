<script setup>
import { useTranslation } from '@/utils/hooks'
import { theme } from 'ant-design-vue'

const t = useTranslation()

const { useToken } = theme
const { token } = useToken()
</script>

<template>
  <div class="footer" :style="{ backgroundColor: token.colorBgContainer }">
    <a-typography-text>&copy; {{ t("copyrights.arr") }}</a-typography-text>
    <a-typography-text>&copy; {{ t("copyrights.cookies") }}</a-typography-text>
  </div>
</template>

<style scoped>
.footer {
  transition: background-color 0.5s ease;
  padding-left: 6rem;
  padding-right: 6rem;
  padding-top: 2rem;
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
