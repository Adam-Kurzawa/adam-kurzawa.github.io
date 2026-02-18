<script setup>
import { useAsset } from '@/utils/hooks'
import BlogYearSection from '@/components/blog/BlogYearSection.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'

const articles = useAsset(import('@/assets/articles_idx.json'))
</script>

<template>
	<main class="flex-grow" v-if="articles">
		<div class="animate-in fade-in duration-500 max-w-7xl mx-auto mb-20 px-6 pt-40 dark:bg-slate-950 transition-colors">
        	<Breadcrumbs class="px-6" :locations="[ { name: 'Blog', target: '/blog' } ]" />
			<ViewHeader title="Blog" description="Blah blah blah" />
			<div class="space-y-10">
				<BlogYearSection v-for="[year, entries] in articles" :year="year" :titles="entries.map(x => x.key)" />
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

	.entries-section > .h2 {
		padding-left: 1.25rem;
	}
}

@media screen and (max-width: 600px) {
	.entries {
		display: flex;
		flex-direction: column;
	}
}
</style>
