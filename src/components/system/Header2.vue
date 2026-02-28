<script setup>
import HeaderUnderline from './HeaderUnderline.vue';

const props = defineProps([ 'value' ])
</script>

<template>
    <div>
        <h2 class="text-3xl font-serif text-slate-900">{{ props.value }}</h2>
        <HeaderUnderline />
    </div>
</template>
