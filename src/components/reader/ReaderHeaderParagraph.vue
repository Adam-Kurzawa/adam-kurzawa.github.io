<script setup>
import Header2 from '../system/Header2.vue';

const props = defineProps([ 'paragraph' ])
</script>

<template>
  <Header2 :value="props.paragraph.value" class="!mb-5" />
</template>
