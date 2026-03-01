<script setup>
import CloseIcon from '../icons/CloseIcon.vue'
import Header3 from './Header3.vue'
import IconButton from './IconButton.vue'
import PrimaryButton from './PrimaryButton.vue'
import SecondaryButton from './SecondaryButton.vue'

const props = defineProps([ 'title', 'no', 'yes', 'visibility' ])
</script>

<template>
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300" :hidden="!props.visibility">
        <div class="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[1rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300">
            <div class="px-8 pb-2 pt-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <Header3 :value="props.title" class="!mt-2" />
                <IconButton @click="$emit('close')">
                    <CloseIcon />
                </IconButton>
            </div>
            <div class="px-8 py-10 max-h-[60vh] overflow-y-auto">
                <slot></slot>
            </div>
            <div class="px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-end gap-3">
                <SecondaryButton :value="props.no" @click="$emit('close')"></SecondaryButton>
                <PrimaryButton :value="props.yes" @click="$emit('accept')"></PrimaryButton>
            </div>
        </div>
        <div class="absolute inset-0 -z-10"></div>
    </div>
</template>