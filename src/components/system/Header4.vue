<script setup>
import { H4_STYLE } from './headers';

const props = defineProps([ 'value' ])
</script>

<template>
    <h4 :class="H4_STYLE">{{ props.value }}</h4>
</template>
