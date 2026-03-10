<script setup>
import Reader from '@/components/reader/Reader.vue'
import { useMarkdown } from '@/utils/useMarkdown'
import { useChapterNumber } from '@/utils/useChapterNumber'
import ReaderSkeleton from '@/components/reader/ReaderSkeleton.vue'

const chapterNumber = useChapterNumber()
const { metadata, htmlContent, htmlChapters } = useMarkdown()
</script>

<template>
  <main class="flex items-center pt-[10rem] pb-[5rem] px-[12rem] w-full transition-all bg-slate-50">
    <Reader v-if="htmlContent" 
            :metadata="metadata" 
            :chapter-number="chapterNumber" 
            :html-content="htmlContent" 
            :html-chapters="htmlChapters" 
    />
    <ReaderSkeleton v-else />
  </main>
</template>
