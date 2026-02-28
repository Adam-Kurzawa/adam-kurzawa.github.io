<script setup>
import CodexSection from '@/components/codex/CodexSection.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import GenericView from '@/GenericView.vue'
import { useAsset } from '@/utils/hooks'

const codexIdx = useAsset(import('@/assets/codex_idx.json'))
</script>

<template>
	<GenericView v-if="codexIdx">
		<Breadcrumbs :locations="[ { name: 'Codex', target: '/codex' } ]" />
		<ViewHeader title="Codex" description="Witaj w sercu uniwersów Alternaty. Tutaj gromadzimy wiedzę o postaciach, technologiach i historii światów, które narodziły się w wyobraźni. Wybierz ścieżkę, by dowiedzieć się więcej." />
		<div class="py-20 space-y-48">
			<CodexSection v-for="(value, key, index) in codexIdx" :key="key" :universum="key" :index="index + 1" :cover="value.cover" :logo="value.logo" :description="value.description" />
		</div>
	</GenericView>
</template>
