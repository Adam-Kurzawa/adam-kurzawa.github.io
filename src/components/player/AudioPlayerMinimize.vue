<script setup>
import IconButton from '../system/IconButton.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
</script>

<template>
	<IconButton @click="$emit('hide')">
		<ArrowRightIcon />
	</IconButton>
</template>
