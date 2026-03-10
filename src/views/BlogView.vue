<script setup>
import { useAsset } from '@/utils/useAsset'
import BlogYearSection from '@/components/blog/BlogYearSection.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import GenericView from '@/GenericView.vue'

const articles = useAsset(import('@/assets/articles_idx.json'))
</script>

<template>
	<GenericView>
		<Breadcrumbs :locations="[ { name: 'Blog', target: '/blog' } ]" />
		<ViewHeader title="Blog" description="Blah blah blah" />
		<div class="space-y-30">
			<BlogYearSection v-for="[year, entries] in articles" :year="year" :titles="entries.map(x => x.key)" />
		</div>
	</GenericView>
</template>
