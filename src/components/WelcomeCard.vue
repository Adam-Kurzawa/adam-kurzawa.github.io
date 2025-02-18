<script setup>
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
</script>

<template>
    <a-typography-paragraph class="quote">
        <blockquote>{{ t('welcome.text') }} <a-button size="small">{{ t('welcome.buycoffee') }}</a-button> {{ t('welcome.text2') }} <a-button size="small">{{ t('welcome.patronite') }}</a-button> .</blockquote>
    </a-typography-paragraph>
</template>

<style scoped>
.quote {
    padding-left: 8rem;
    padding-right: 8rem;
}
</style>