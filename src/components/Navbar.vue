<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTranslation } from '@/utils/useTranslation'

const t = useTranslation()

const link = (view) => computed(() => {
  return { name: view }
})
</script>

<template>
  <div class="max-w-[1400px] mx-auto h-full px-6 md:px-12">
    <div class="flex justify-between items-center h-full relative">
      <div class="hidden lg:flex flex-1"></div>
			<RouterLink to="/" class="logo">Alternata</RouterLink>
      <nav class="hidden lg:flex items-center justify-end space-x-8 flex-1">
				<RouterLink :to="link('stories')" class="group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          {{ t("navbar.stories") }}
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full "></span>
        </RouterLink>
				<RouterLink :to="link('blog')" class="group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          {{ t("navbar.blog") }}
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full "></span>
        </RouterLink>
        <RouterLink :to="link('codex')" class="group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          {{ t("navbar.codex") }}
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full "></span>
        </RouterLink>
				<RouterLink :to="link('about')" class="group relative text-[11px] font-bold uppercase tracking-[0.2em] transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          {{ t("navbar.about") }}
          <span class="absolute -bottom-1 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover:w-full "></span>
        </RouterLink>
      </nav>
      <div class="flex items-center gap-5 pl-8 border-l border-slate-200 dark:border-slate-800 ml-8">
        <button class="!text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-110 active:scale-95" title="Tryb ciemny">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
          </svg>
        </button>
      </div>
      <div class="lg:hidden flex items-center gap-4">
        <button class="p-2 text-slate-500 dark:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true">
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  transition: color 0.5s ease;
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 2rem;
}

.logo:hover {
  color: #3c89e8;
}
</style>