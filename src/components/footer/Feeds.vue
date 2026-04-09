<script setup>
import FeedButton from './FeedButton.vue'
</script>

<template>
    <div class="flex flex-col md:flex-row justify-between items-center gap-10">
        <div class="flex flex-col gap-1">
            <p class="text-3xl font-yeseva text-slate-900 cursor-pointer">Alternata</p>
            <p class="text-base text-slate-500 cursor-pointer">Autorski blog Adama Kurzawy</p>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-base text-slate-500 font-semibold cursor-pointer">Źródła dla czytników feedów</p>
            <div class="flex gap-4">
                <FeedButton name="RSS" file="rss.xml" />
                <FeedButton name="Atom" file="atom.xml" />
                <FeedButton name="JSON" file="feed.json" />
            </div>
        </div>
    </div>
</template>
