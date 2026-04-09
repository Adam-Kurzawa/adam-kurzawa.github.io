<script setup>
import { useTranslation } from '@/utils/useTranslation'

const t = useTranslation()
</script>

<template>
    <section class="max-w-5xl mx-auto mt-40 py-10 px-6 border-b border-t border-slate-200">
        <p class="text-lg text-slate-600 leading-[1.80rem] font-light">
            {{ t('welcome.text') }} {{ t('welcome.buycoffee') }} {{ t('welcome.text2') }} {{ t('welcome.patronite') }}.
        </p>
    </section>
</template>

<style scoped>
p::first-letter {
	font-size: 3.5rem;
	margin-right: 0.5rem;
	margin-top: 0.9rem;
	line-height: 2rem;
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
	float: left;
}
</style>