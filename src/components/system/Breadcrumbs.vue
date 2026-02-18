<script setup>
const props = defineProps([ 'locations' ])
</script>

<template>
    <nav class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 !p-0">
        <RouterLink class="hover:text-blue-600 transition-colors" to="/">Strona główna</RouterLink>
        <template v-for="location in props.locations">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
            <RouterLink class="text-slate-900 dark:text-white" :to="location.target">{{ location.name }}</RouterLink>
        </template>
    </nav>
</template>
