<script setup>
import { useThemeStore } from '@/stores/theme'
import FeedButton from './FeedButton.vue'

const themeStore = useThemeStore()
</script>

<template>
    <a-config-provider :theme="{ token: { colorPrimary: '#EB7818' } }">
        <div class="feeds" :class="[ themeStore.primaryBackgroundColor ]" >
            <a-button-group>
                <FeedButton name="RSS" file="rss.xml" />
                <FeedButton name="Atom" file="atom.xml" />
                <FeedButton name="JSON" file="feed.json" />
            </a-button-group>
        </div>
    </a-config-provider>
</template>

<style scoped>
.feeds {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    transition: background-color 0.5s ease;
}
</style>