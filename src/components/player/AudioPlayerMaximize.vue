<script setup>
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
import IconButton from '../system/IconButton.vue';
</script>

<template>
	<div>
		<IconButton @click="$emit('show')" class="ml-3">
			<ArrowRightIcon class="rotate-180" />
		</IconButton>
	</div>
</template>
