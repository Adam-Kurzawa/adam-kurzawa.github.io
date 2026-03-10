<script setup>
import { H3_STYLE } from './headers';

const props = defineProps([ 'value' ])
</script>

<template>
    <h3 :class="H3_STYLE">{{ props.value }}</h3>
</template>
