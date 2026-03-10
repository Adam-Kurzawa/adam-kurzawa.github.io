<script setup>
import { computed } from 'vue'
import { useAsset } from '@/utils/useAsset'
import { useTranslation } from '@/utils/useTranslation'
import { useRouter } from 'vue-router'
import Header2 from '../system/Header2.vue'
import Hyperlink from '../system/Hyperlink.vue'
import LazyBlogThumbnail from '../thumbnails/LazyBlogThumbnail.vue'

const router = useRouter()
const t = useTranslation()

const articles = useAsset(import('@/assets/articles_idx.json'))

const newest = computed(() => {
    return articles.value
        .reduce((a, [y, e]) => [...a, ...e], [])
        .slice(0, 5)
})

const goToBlog = () => {
    router.push({
        name: 'blog'
    })
}
</script>

<template>
    <section v-if="articles" class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex justify-between items-end mb-12">
            <Header2 value="Najnowsze artykuły z bloga" />
            <Hyperlink value="Zobacz wszystkie" @click="goToBlog"/>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <LazyBlogThumbnail v-for="entry in newest" :key="entry.key" :title="entry.key" />
        </div>
    </section>
</template>
