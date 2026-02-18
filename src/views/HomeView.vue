<script setup>
import AlternataSection from '../components/home/AlternataSection.vue'
import Greetings from '@/components/home/Greetings.vue'
import NewBlogPosts from '@/components/home/NewBlogPosts.vue'
import DoktrynaSolarnaSection from '@/components/home/DoktrynaSolarnaSection.vue'
import OtherStoriesSection from '@/components/home/OtherStoriesSection.vue'
</script>

<template>
  <main class="flex-grow">
    <Greetings />
    <NewBlogPosts />
    <AlternataSection />
    <DoktrynaSolarnaSection />
    <OtherStoriesSection />
  </main>
</template>
