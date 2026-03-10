<script setup lang="ts">
import { useStaticAsset } from '@/utils/useStaticAsset';
import PromotedStoryThumbnail from '../thumbnails/PromotedStoryThumbnail.vue';
import Header2 from './../system/Header2.vue'
import { useTranslation } from '@/utils/useTranslation'

const t = useTranslation()
</script>

<template>
    <section class="max-w-7xl mx-auto px-6 py-20 pb-32">
        <Header2 class="mb-12" value="Inne wydania" />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <PromotedStoryThumbnail :title="t('egzorcyzmy-card.story-title')" img="https://fantazmaty.pl/wp-content/uploads/2024/12/okladka_f4_v2-600x851-optimized.png" :description="[ t(`egzorcyzmy-card.description.0`), t(`egzorcyzmy-card.description.1`) ]" />
            <PromotedStoryThumbnail :title="t('bukowe-card.title')" :img="useStaticAsset('bukowe_widziadlo.jpg')" :description="[ t(`bukowe-card.description.0`), t(`bukowe-card.description.1`), t(`bukowe-card.description.2`), t(`bukowe-card.description.3`) ]" />
        </div>
    </section>
</template>