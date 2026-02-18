<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <span class="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded">{{ props.value }}</span>
</template>