<script setup>
import { computed, ref } from 'vue'
import { useAsset, useLocale, useTranslation } from '@/utils/hooks'
import BlogCard from './BlogCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const locale = useLocale()
const t = useTranslation()

const articles = useAsset(import('@/assets/articles_idx.json'))

const newest = computed(() => {
    return articles.value
        .reduce((a, [y, e]) => [...a, ...e], [])
        .slice(0, 5)
})

const goToBlog = () => {
    router.push({
        name: 'blog',
        params: { lang: locale.value }
    })
}
</script>

<template>
    <div v-if="articles">
        <div class="header">
            <a-typography-title class="h3" :level="3">Najnowsze artykuły z bloga</a-typography-title>
            <a-button type="link" @click="goToBlog">Zobacz wszystkie</a-button>
        </div>
        <div class="spotlight">
            <BlogCard v-for="entry in newest" :key="entry.key" :title="entry.key" />
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.spotlight {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 20%));
    gap: 1rem;
}

.h3 {
    font-family: 'Yeseva One';
    font-weight: 100;
    margin-bottom: 1rem;
}

@media screen and (max-width: 1280px) {
  .spotlight {
    grid-template-columns: repeat(3, minmax(0, 34%));
  }
}

@media screen and (max-width: 1024px) {
  .spotlight {
    grid-template-columns: repeat(2, minmax(0, 50%));
  }
}
</style>