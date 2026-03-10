<script setup>
import { H2_STYLE } from './headers';
import HeaderUnderline from './HeaderUnderline.vue';

const props = defineProps([ 'value' ])
</script>

<template>
    <div>
        <h2 :class="H2_STYLE">{{ props.value }}</h2>
        <HeaderUnderline />
    </div>
</template>
