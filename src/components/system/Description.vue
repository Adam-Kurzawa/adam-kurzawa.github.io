<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <p class="text-slate-600 dark:text-slate-400 leading-relaxed flex-1 text-base md:text-lg font-light !m-0">{{ props.value }}</p>
</template>
