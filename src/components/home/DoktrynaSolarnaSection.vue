<script setup>
import { useTranslation } from '@/utils/hooks'
import { useStaticAsset } from '@/utils/useStaticAsset';

const t = useTranslation()
</script>

<template>
    <section class="bg-amber-600 relative h-200">
        <div class="absolute inset-0 z-0">
            <img class="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" :src="useStaticAsset('ds-front.webp')">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 p-12">
            <img :src="useStaticAsset('doktryna_solarna_dark.png')" />
        </div>
    </section>
</template>