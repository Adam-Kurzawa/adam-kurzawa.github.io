<script setup>
const props = defineProps([ 'header', 'text', 'icon' ])
</script>

<template>
	<a-button class="btn" @click="$emit('click')" :style="{ height: '4rem' }">
		<a-image :src="props.icon" :preview="false" width="2rem" />
		<span class="labels">
			<a-typography-text>{{ props.header }}</a-typography-text>
			<a-typography-text type="secondary">{{ props.text }}</a-typography-text>
		</span>
	</a-button>
</template>

<style scoped>
.btn {
	height: 5rem;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
	gap: 0.5rem;
}

.labels {
	display: flex;
	flex-direction: column;
	align-items: start;
}
</style>
