<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <div>
        <h3 class="text-xl !font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{{ props.value }}</h3>
    </div>
</template>
