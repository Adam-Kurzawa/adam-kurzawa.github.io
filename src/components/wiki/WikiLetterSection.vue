<script setup>
import { useRouter } from 'vue-router';
import PersonIcon from '../icons/PersonIcon.vue';
import Header2 from '../system/Header2.vue';
import LargeButton from '../system/LargeButton.vue';

const props = defineProps([ 'letter', 'links', 'universum' ])
const router = useRouter()

const openEntry = (title) => {
    router.push({
        name: 'reader',
        params: { title: title, type: props.universum }
    })
}
</script>

<template>
	<article class="flex flex-col gap-4">
		<Header2 :value="props.letter" />
		<div class="grid gap-4 grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
			<LargeButton v-for="value in props.links" :key="value.key" :title="value.title" :description="value.description" @click="openEntry(value.key)">
				<PersonIcon class="!m-3 group-hover/btn:scale-120 transition-transform" />
			</LargeButton>
		</div>
	</article>
</template>