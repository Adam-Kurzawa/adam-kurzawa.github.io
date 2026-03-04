<script setup>
import WikiLetterSection from './WikiLetterSection.vue';
import { computed } from 'vue';

const props = defineProps([ 'entries', 'universum' ])

const entriesByLetter = computed(() => Object.groupBy(props.entries, ({ title }) => title[0]))
</script>

<template>
    <div class="flex flex-col gap-12">
        <WikiLetterSection v-if="entriesByLetter" v-for="(links, letter) in entriesByLetter" :key="letter" :universum="props.universum" :letter="letter" :links="links" />
    </div>
</template>