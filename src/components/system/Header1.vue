<script setup>
import { H1_STYLE } from './headers';

const props = defineProps([ 'value' ])
</script>

<template>
    <h1 :class="H1_STYLE">{{ props.value }}</h1>
</template>
