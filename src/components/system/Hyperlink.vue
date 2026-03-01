<script setup>
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';

const props = defineProps([ 'value' ])
</script>

<template>
    <a class="text-xs !font-semibold uppercase text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group tracking-widest cursor-pointer">
        {{ props.value }}
        <ArrowRightIcon />
    </a>
</template>
