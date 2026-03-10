<script setup>
import { useTranslation } from '@/utils/useTranslation'

const t = useTranslation()
</script>

<template>
    <section class="max-w-5xl mx-auto mt-10 px-6 md:pt-24 border-b border-slate-50">
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
    color: lightgrey;
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
	float: left;
}
</style>