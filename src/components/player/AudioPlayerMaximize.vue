<script setup>
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
import IconButton from '../system/IconButton.vue';
</script>

<template>
	<IconButton @click="$emit('show')">
		<ArrowRightIcon class="rotate-180" />
	</IconButton>
</template>
