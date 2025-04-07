<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
</script>

<template>
	<a-button type="text" shape="circle" size="large" @click="$emit('show')">
		<template #icon>
			<ArrowLeftOutlined />
		</template>
	</a-button>
</template>

<style scoped>
</style>