<script setup>
const props = defineProps([ 'value' ])
</script>

<template>
    <div class="underline"></div>
</template>

<style scoped>
.underline {
    display: block;
    width: 80px;
    background-color: rgb(37, 99, 235);
    height: 4px;
}
</style>