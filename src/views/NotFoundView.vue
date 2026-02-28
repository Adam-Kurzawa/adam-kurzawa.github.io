<script setup>
import GenericView from '@/GenericView.vue';
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
  <GenericView>
    <p>{{ t('page-not-found') }}</p>
  </GenericView>
</template>