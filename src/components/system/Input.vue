<script setup>
import { computed, ref } from 'vue';

const props = defineProps([ 'placeholder', 'type', 'required' ])
const model = defineModel()

const required = computed(() => props.required ?? false)
const touched = ref(false)

const onBlur = () => {
    touched.value = required.value
}
</script>

<template>
    <div class="relative bg-slate-50 flex flex-row items-center border border-slate-200 dark:border-slate-800 group rounded-[0.5rem] focus-within:border focus-within:border-blue-500 [&:has(input:invalid)]:border-red-600 [&:has(textarea:invalid)]:border-red-600">
        <slot name="prefix"></slot>
        <textarea v-if="type === 'textarea'" :placeholder="props.placeholder" v-model="model" rows="3" @blur="onBlur" :required="touched" class="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-[0.5rem] outline-none dark:text-white placeholder:text-slate-400 invalid:placeholder:text-red-600" type="text" />
        <input v-else :placeholder="props.placeholder" v-model="model" @blur="onBlur" :required="touched" class="w-full px-4 py-3 bg-white dark:bg-slate-900 rounded-[0.5rem] outline-none dark:text-white placeholder:text-slate-400 invalid:placeholder:text-red-600" :type="props.type" />
        <slot name="postfix"></slot>
    </div>
</template>