<script setup>
import FeedButton from './FeedButton.vue'
</script>

<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-10">
        <p class="text-3xl font-yeseva text-slate-900 mb-2 cursor-pointer">Alternata</p>
        <div class="flex gap-4">
            <FeedButton name="RSS" file="rss.xml" />
            <FeedButton name="Atom" file="atom.xml" />
            <FeedButton name="JSON" file="feed.json" />
        </div>
    </div>
</template>
