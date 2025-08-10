<script setup>
import { useLocale, useTranslation } from '@/utils/hooks'
import { useRouter } from 'vue-router'
import { theme } from 'ant-design-vue'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const locale = useLocale()

const themeStore = useThemeStore()
const t = useTranslation()

const { useToken } = theme
const { token } = useToken()

const goToBlog = () => {
    router.push({
        name: 'blog',
        params: { lang: locale.value }
    })
}
</script>

<template>
	<a-button class="arrow" :class="`arrow-${themeStore.currentTheme}`" @click="goToBlog" :style="{ borderColor: token.colorBorderSecondary }">
		<div class="arrow-content">
			<img class="arrow-right" src="/arrow_right.png"></img>
			<a-typography-text strong>Zobacz wszystkie</a-typography-text>
		</div>
	</a-button>
</template>

<style scoped>
.arrow-right {
    max-width: 50%;
}

.arrow {
    height: 100%;
    box-shadow: none !important;
	transition: background-color 0.5s ease, border-color 1s ease, font-size 1s ease;
}

.arrow-content {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 2rem;
    align-items: center;
}

.arrow-light:hover {
	border-color: #4096ff !important;
	background-color: rgba(0, 0, 0, 0.05);
}

.arrow-dark:hover {
	border-color: #3c89e8 !important;
	background-color: rgba(256, 256, 256, 0.05);
}
</style>