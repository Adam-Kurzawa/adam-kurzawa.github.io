<script setup>
import { useThemeStore } from '@/stores/theme'

const props = defineProps([ 'paragraph' ])

const themeStore = useThemeStore()
</script>

<template>
	<a-typography-title :style="{ fontFamily: 'Yeseva One', fontWeight: '100' }" class="header">
		{{ props.paragraph.value }}
	</a-typography-title>
</template>

<style scoped>
.header {
  transition: color 1s ease;
  font-family: "Yeseva One", serif;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>