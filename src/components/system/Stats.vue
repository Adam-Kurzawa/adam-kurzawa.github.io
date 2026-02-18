<script setup>
const props = defineProps([ 'label', 'value' ])
</script>

<template>
    <div class="flex flex-col">
        <span class="text-xs uppercase text-slate-400 dark:text-slate-600 font-bold mb-2 flex items-center gap-2">
            <slot></slot>
            <p class="align-middle !mb-0 !mt-0.5">
                {{ props.label }}
            </p>
        </span>
        <span class="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200">{{ props.value }}</span>
    </div>
</template>
