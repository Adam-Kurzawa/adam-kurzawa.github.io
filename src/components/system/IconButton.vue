<template>
    <button @click="$emit('click')" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
        <slot></slot>
    </button>
</template>