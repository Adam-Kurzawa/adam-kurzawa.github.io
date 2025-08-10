<script setup>
import { computed } from 'vue'

const props = defineProps([ 'paragraph', 'index', 'fontSize', 'fontFamily' ])

const columns = computed(() => {
	return props.paragraph.value[0]
		.map((header, index) => {
			return {
				title: header,
				dataIndex: index,
				key: index,
			}
		})
})

const data = computed(() => {
	return props.paragraph.value
		.slice(1)
		.map((row, rowIndex) => {
			return {
				key: rowIndex,
				...row
			}
		})
})
</script>

<template>
	<a-table :columns="columns" :data-source="data" bordered :pagination="false">
		<template #footer v-if="props.paragraph.description">{{ props.paragraph.description }}</template>
	</a-table>
</template>
