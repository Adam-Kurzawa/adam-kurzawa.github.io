<script setup>
import { message } from 'ant-design-vue'
import { useLocale, useTranslation } from '@/utils/hooks'

const props = defineProps([ 'name', 'file' ])

const t = useTranslation()
const locale = useLocale()

const copyFeedUrlToClipboard = (feed) => {
    const url = `https://adamkurzawa.pl/${locale.value}/${feed}`

    navigator.clipboard.writeText(url).then(
        function() {
            message.success(t('feeds.copy-success'))
        }, 
        function(err) {
            message.error(t('feeds.copy-error'))
        }
    );
}
</script>

<template>
    <a-button type="primary" size="large" @click="() => copyFeedUrlToClipboard(props.file)">
        <div class="feed-btn-content">
            <a-image src="/rss-symbol.png" :preview="false" width="1rem" />
            {{ props.name }}
        </div>
    </a-button>
</template>

<style scoped>
.feed-btn-content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.5rem;
}
</style>