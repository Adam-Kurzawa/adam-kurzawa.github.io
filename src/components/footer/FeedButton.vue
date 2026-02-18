<script setup>
import { message } from 'ant-design-vue'
import { useTranslation } from '@/utils/hooks'

const props = defineProps([ 'name', 'file' ])

const t = useTranslation()

const copyFeedUrlToClipboard = (feed) => {
    const url = `https://adamkurzawa.pl/pl/${feed}`

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
    <button class="flex items-center gap-2 px-6 py-3 bg-orange-600 !text-white rounded-[0.5rem] !text-xs font-bold !uppercase tracking-widest hover:bg-orange-700 transition-colors" @click="() => copyFeedUrlToClipboard(props.file)">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rss" aria-hidden="true">
            <path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>
        </svg>
        {{ props.name }}
    </button>
</template>
