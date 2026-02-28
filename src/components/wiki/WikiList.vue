<script setup>
import { useRouter } from 'vue-router';
import SecondaryButton from '../system/SecondaryButton.vue';

const props = defineProps([ 'entries', 'universum' ])

const router = useRouter()

const openEntry = (title) => {
    router.push({
        name: 'reader',
        params: { title: title },
		query: { type: props.universum }
    })
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <SecondaryButton v-for="entry in props.entries" :key="entry.key" :value="entry.title" @click="openEntry(entry.key)" />
    </div>
</template>