<script setup>
import Breadcrumbs from '@/components/system/Breadcrumbs.vue'
import ViewHeader from '@/components/system/ViewHeader.vue'
import WikiList from '@/components/wiki/WikiList.vue';
import GenericView from '@/GenericView.vue'
import { useAsset } from '@/utils/useAsset';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const codexIdx = useAsset(import('@/assets/codex_idx.json'))

const universum = route.params.universum
const wiki = computed(() => codexIdx.value[universum])
</script>

<template>
	<GenericView v-if="codexIdx">
		<Breadcrumbs :locations="[ { name: 'Codex', target: '/codex' }, { name: wiki.title, target: `/wiki/${universum}` } ]" />
		<ViewHeader :title="wiki.title" description="Przeglądaj pełną bibliotekę tekstów. Wybierz gatunek lub skorzystaj z wyszukiwarki, aby odnaleźć interesującą Cię historię." />
		<WikiList :entries="wiki.values" :universum="universum" />
	</GenericView>
</template>
