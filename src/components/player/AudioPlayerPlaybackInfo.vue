<script setup>
const props = defineProps([ 'series', 'title' ])
</script>

<template>
	<div class="story-info">
		<a-typography-text type="secondary">
			{{ props.series ?? '-' }}
		</a-typography-text>
		<a-typography-text strong :ellipsis="{ expandable: false, tooltip: false, rows: 1 }" :style="{ minWidth: '10.5rem', maxWidth: '10.5rem' }">
			{{ props.title ?? '-' }}
		</a-typography-text>
	</div>
</template>

<style scoped>
.story-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
</style>