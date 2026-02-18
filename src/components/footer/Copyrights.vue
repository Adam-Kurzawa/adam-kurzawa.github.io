<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
  <div class="mt-10 pt-10 border-t border-slate-200 text-center flex flex-col gap-2">
    <p class="text-slate-400 text-base">&copy; {{ t("copyrights.arr") }}</p>
    <p class="text-slate-300 text-sm">{{ t("copyrights.cookies") }}</p>
  </div>
</template>
