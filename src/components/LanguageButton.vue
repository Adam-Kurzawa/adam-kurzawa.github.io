<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '@/utils/hooks'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const router = useRouter()
const locale = useLocale()
const themeStore = useThemeStore()

const changeLanguage = () => {
  if(locale.value === 'pl')
    locale.value = 'en'
  else
    locale.value = 'pl'

  if(route.name !== 'home') {
    if(route.query)
      router.push({ name: route.name, params: { ...route.params, lang: locale.value }, query: { ...route.query } })
    else
      router.push({ name: route.name, params: { ...route.params, lang: locale.value } })
  }
}
</script>

<template>
    <a href="#" class="language-button" :class="themeStore.primaryTextColor" @click="changeLanguage">
        <img v-if="locale === 'en'" class="language-button-flag" src="../assets/PL.png"/>
        <img v-if="locale === 'pl'" class="language-button-flag" src="../assets/ENG.png"/>
        {{ locale === 'pl' ? 'ENG' : 'PL' }}
    </a>
</template>

<style scoped>
.language-button {
  transition: color 1s ease;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: lighter;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  display: flex;
  margin-top: 0.25rem;
  gap: 0.5rem;
}

.language-button:hover {
  color: limegreen;
}

.language-button-flag {
  max-width: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 500px) {
  .language-button-flag {
    display: none;
  }
}
</style>