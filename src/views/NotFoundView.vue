<script setup>
import GenericView from '@/GenericView.vue';
import { useTranslation } from '@/utils/useTranslation'

const t = useTranslation()
</script>

<template>
  <GenericView>
    <p>{{ t('page-not-found') }}</p>
  </GenericView>
</template>