<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <h2 class="text-2xl font-serif text-slate-900">{{ props.value }}</h2>
</template>
