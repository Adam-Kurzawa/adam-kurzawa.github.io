<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <h2 class="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight">{{ props.value }}</h2>
</template>
