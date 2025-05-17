<script setup>
import { message } from 'ant-design-vue'
import { useLocale, useTranslation } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'

const t = useTranslation()
const locale = useLocale()
const themeStore = useThemeStore()

const copyFeedUrlToClipboard = (feed) => {
    const url = `https://adamkurzawa.pl/${locale.value}/${feed}`

    navigator.clipboard.writeText(url).then(
        function() {
            message.success(t('feeds.copy-success'))
        }, 
        function(err) {
            console.error(err)
            message.error(t('feeds.copy-error'))
        }
    );
}
</script>

<template>
    <a-config-provider :theme="{ token: { colorPrimary: '#EB7818' } }">
        <div class="feeds" :class="[ themeStore.primaryBackgroundColor ]" >
            <a-button type="primary" size="large" @click="() => copyFeedUrlToClipboard('rss.xml')">
                <div class="feed-btn-content">
                    <a-image src="/rss-symbol.png" :preview="false" width="1rem" />
                    RSS
                </div>
            </a-button>
            <a-button type="primary" size="large" @click="() => copyFeedUrlToClipboard('atom.xml')">
                <div class="feed-btn-content">
                    <a-image src="/rss-symbol.png" :preview="false" width="1rem" />
                    Atom
                </div>
            </a-button>
            <a-button type="primary" size="large" @click="() => copyFeedUrlToClipboard('feed.json')">
                <div class="feed-btn-content">
                    <a-image src="/rss-symbol.png" :preview="false" width="1rem" />
                    JSON
                </div>
            </a-button>
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

.feed-btn-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
}
</style>