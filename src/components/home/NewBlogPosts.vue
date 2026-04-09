<script setup>
import { computed } from 'vue'
import { useTranslation } from '@/utils/useTranslation'
import { useRouter } from 'vue-router'
import Header2 from '../system/Header2.vue'
import Hyperlink from '../system/Hyperlink.vue'
import LazyBlogThumbnail from '../thumbnails/LazyBlogThumbnail.vue'
import { useMetaindex } from '@/utils/useMetaindex'

const router = useRouter()
const t = useTranslation()

const metaindex = useMetaindex()

const newestBlogPost = computed(() => {
    return metaindex.value.blog
        .reduce((a, [y, e]) => [...a, ...e], [])
        .slice(0, 6)
})

const goToBlog = () => {
    router.push({
        name: 'blog'
    })
}
</script>

<template>
    <section v-if="metaindex" class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex justify-between items-end mb-12">
            <Header2 value="Najnowsze artykuły z bloga" />
            <Hyperlink value="Zobacz wszystkie" @click="goToBlog"/>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <LazyBlogThumbnail v-for="post in newestBlogPost" :key="post.documentId" :metadata="post" />
        </div>
    </section>
</template>
