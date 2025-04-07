<script setup>
import { ArrowRightOutlined } from '@ant-design/icons-vue';
</script>

<template>
	<a-button type="text" shape="circle" size="large" @click="$emit('hide')">
		<template #icon>
			<ArrowRightOutlined />
		</template>
	</a-button>
</template>

<style scoped>
</style>