<script setup>
import { computed, ref } from 'vue'
import { useAsset, useInnerWidth, useLocale, useTranslation } from '@/utils/hooks'
import BlogCard from './BlogCard.vue'
import { useRouter } from 'vue-router'
import ReadMoreCard from './ReadMoreCard.vue'

const router = useRouter()
const locale = useLocale()
const t = useTranslation()
const width = useInnerWidth()

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
            <ReadMoreCard v-if="width > 600 && width < 1281" key="read_more_spotlight" />
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

@media screen and (max-width: 600px) {
  .spotlight {
    display: flex;
    flex-direction: column;
  }

  .header {
    flex-direction: column;
    margin-bottom: 1rem;
    align-items: start;
  }

  .header > button {
    padding-left: 0;
  }
}
</style>