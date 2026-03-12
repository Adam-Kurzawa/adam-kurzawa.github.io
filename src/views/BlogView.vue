<script setup>
import BlogYearSection from '@/components/blog/BlogYearSection.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import GenericView from '@/GenericView.vue'
import { useMetaindex } from '@/utils/useMetaindex'

const metaindex = useMetaindex()
</script>

<template>
	<GenericView>
		<Breadcrumbs :locations="[ { name: 'Blog', target: '/blog' } ]" />
		<ViewHeader title="Blog" description="Blah blah blah" />
		<template v-if="metaindex">
			<div class="space-y-30">
				<BlogYearSection v-for="[year, posts] in metaindex.blog" :key="year" :year="year" :posts="posts" />
			</div>
		</template>
	</GenericView>
</template>
