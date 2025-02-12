<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '@/utils/hooks'

const route = useRoute()
const router = useRouter()
const locale = useLocale()

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
    <a-button size="large" @click="changeLanguage">
      <a-space size="small">
        <img v-if="locale === 'en'" class="language-button-flag" src="../assets/PL.png"/>
        <img v-if="locale === 'pl'" class="language-button-flag" src="../assets/ENG.png"/>
        {{ locale === 'pl' ? 'ENG' : 'PL' }}
      </a-space>
    </a-button>
</template>

<style scoped>
.language-button-flag {
  max-width: 2rem;
  margin-top: -0.25rem;
}

@media screen and (max-width: 500px) {
  .language-button-flag {
    display: none;
  }
}
</style>