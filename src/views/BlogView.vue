<script setup>
import { useRoute } from 'vue-router'
import { useLocale, useAsset } from '@/utils/hooks'
import BlogCard from '@/components/BlogCard.vue'
import { theme } from 'ant-design-vue'

const locale = useLocale()
const route = useRoute()

const { useToken } = theme
const { token } = useToken()

locale.value = route.params.lang

const articles = useAsset(import('@/assets/articles_idx.json'))
</script>

<template>
	<main class="generic-view" v-if="articles">
		<div class="entries-section" v-for="[year, entries] in articles">
			<a-typography-title class="h2" :level="2" :style="{ borderTopColor: token.colorBorderSecondary }">{{ year }}</a-typography-title>
			<div class="entries">
				<BlogCard v-for="entry in entries" :key="entry.key" :title="entry.key" />
			</div>
		</div>
	</main>
</template>

<style scoped>
.entries {
	display: grid;
	grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
	gap: 2rem;
}

.h2 {
    font-family: 'Yeseva One';
    font-weight: 100;
	padding-left: 0.25rem;
    margin-bottom: 1rem;
}

.entries-section:not(:first-of-type) > .h2 {
	width: 100%;
	border-top-width: 1px;
	border-top-style: solid;
	padding-top: 1rem;
}

@media screen and (max-width: 1024px) {
	.entries {
		gap: 1rem;
		margin-top: 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		grid-template-columns: minmax(0, 50%) minmax(0, 50%);
	}
}

@media screen and (max-width: 600px) {
	.entries {
		display: flex;
		flex-direction: column;
	}
}
</style>
