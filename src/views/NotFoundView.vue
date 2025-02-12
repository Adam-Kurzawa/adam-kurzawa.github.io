<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
  <main>
    <a-result status="404" title="404" :sub-title="t('page-not-found')" />
  </main>
</template>