<script setup>
import AboutMe from '@/components/about/AboutMe.vue'
import Breadcrumbs from '@/components/system/Breadcrumbs.vue';
import GenericView from '@/GenericView.vue';
</script>

<template>
	<GenericView>
		<Breadcrumbs class="mb-20" :locations="[ { name: 'O mnie', target: '/about' } ]" />
		<AboutMe />
	</GenericView>
</template>
