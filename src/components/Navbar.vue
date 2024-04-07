<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Submenu from './Submenu.vue';
import { computed } from 'vue';
import { useLocale, useTranslation } from '@/utils/hooks';

const route = useRoute()
const router = useRouter()
const t = useTranslation()
const locale = useLocale()

const otherLanguage = ref(locale.value === 'pl' ? 'ENG' : 'PL')
const otherLanguageFlag = ref()

const scrollThreshold = 100
const isScrolled = ref(false)

watch(otherLanguage, async (newLanguage, oldLanguage) => {
  import(`@/assets/${newLanguage}.png`)
    .then(module => otherLanguageFlag.value = module.default)
})

import(`@/assets/${otherLanguage.value}.png`)
    .then(module => otherLanguageFlag.value = module.default)

const makeBackgroundSolid = (event) => {
  isScrolled.value = window.scrollY > scrollThreshold
}

window.addEventListener('scroll', makeBackgroundSolid)

const changeLanguage = () => {
  if(locale.value === 'pl') {
    otherLanguage.value = 'PL'
    locale.value = 'en'
  } else {
    otherLanguage.value = 'ENG'
    locale.value = 'pl'
  }

  if(route.name !== 'home') {
    if(route.query)
      router.push({ name: route.name, params: { ...route.params, lang: locale.value }, query: { ...route.query } })
    else
      router.push({ name: route.name, params: { ...route.params, lang: locale.value } })
  }
}

const readerLink = (title) => computed(() => {
  return { name: 'reader', params: { lang: locale.value, title: title } }
})

const homeLink = computed(() => {
  return { name: 'home', query: { lang: locale.value } }
})

const localizedLink = (view) => computed(() => {
  return { name: view, params: { lang: locale.value } }
})
</script>

<template>
  <nav class="navbar" :class="[isScrolled ? 'navbar-solid' : 'navbar-gradient']">
    <span class="navbar-full">
      <span class="navbar-section">
        <RouterLink :to="readerLink('powstanie_na_brillar')" class="navlink">{{ t("navbar.powstanie_na_brillar") }}</RouterLink>
        <RouterLink :to="readerLink('klatwa_imetheru')" class="navlink">{{ t("navbar.klątwa_imetheru") }}</RouterLink>
        <RouterLink :to="readerLink('projekt_eclipse')" class="navlink">{{ t("navbar.projekt_eclipse") }}</RouterLink>
      </span>
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <RouterLink :to="localizedLink('stories')" class="navlink">{{ t("navbar.stories") }}</RouterLink>
        <RouterLink :to="localizedLink('books')" class="navlink">{{ t("navbar.books") }}</RouterLink>
        <RouterLink :to="localizedLink('blog')" class="navlink">{{ t("navbar.blog") }}</RouterLink>
        <RouterLink :to="localizedLink('about')" class="navlink">{{ t("navbar.about") }}</RouterLink>
        <a href="#" class="language-changer" @click="changeLanguage"><img class="language-flag" :src="otherLanguageFlag"/>{{ otherLanguage }}</a>
      </span>
    </span>
    <span class="navbar-medium">
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <Submenu :label="t('navbar.stories')" id="menu-stories-medium">
          <li class="collapsed-link"><RouterLink :to="readerLink('powstanie_na_brillar')" class="navlink">{{ t("navbar.powstanie_na_brillar") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="readerLink('klatwa_imetheru')" class="navlink">{{ t("navbar.klątwa_imetheru") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="readerLink('projekt_eclipse')" class="navlink">{{ t("navbar.projekt_eclipse") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="localizedLink('stories')" class="navlink">{{ t("navbar.stories") }}</RouterLink></li>
        </Submenu>
        <RouterLink :to="localizedLink('books')" class="navlink">{{ t("navbar.books") }}</RouterLink>
        <RouterLink :to="localizedLink('blog')" class="navlink">{{ t("navbar.blog") }}</RouterLink>
        <RouterLink :to="localizedLink('about')" class="navlink">{{ t("navbar.about") }}</RouterLink>
        <a href="#" class="language-changer" @click="changeLanguage"><img class="language-flag" :src="otherLanguageFlag"/>{{ otherLanguage }}</a>
      </span>
    </span>
    <span class="navbar-minimal">
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <Submenu id="menu-overflow-minimal" right="true">
          <li class="collapsed-link"><RouterLink :to="localizedLink('stories')" class="navlink">{{ t("navbar.stories") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="localizedLink('books')" class="navlink">{{ t("navbar.books") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="localizedLink('blog')" class="navlink">{{ t("navbar.blog") }}</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="localizedLink('about')" class="navlink">{{ t("navbar.about") }}</RouterLink></li>
        </Submenu>
        <a href="#" class="language-changer" @click="changeLanguage"><img class="language-flag" :src="otherLanguageFlag"/>{{ otherLanguage }}</a>
      </span>
    </span>
  </nav>
</template>

<style scoped>
/* Navbar background and gradient related stuff */
.navbar-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
}

.navbar-solid {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.navbar {
  transition: background 1s ease;
  position: fixed;
  top: 0;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}

.navbar-section {
  transition: gap 1s ease;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 0.35rem;
}

.logo {
  color: white;
  text-decoration: none;
  font-family: 'Yeseva One' !important;
  font-weight: 300 !important;
  font-style: normal !important;
  font-size: 2rem;
  margin-top: 0.25rem;
}

.collapsed-link {
  margin-top: 1rem;
}

.language-changer {
  border: 1px solid #e69b54;
  border-radius: 0.5rem;
  background-color: rgb(30, 54, 54);
  color: white;
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

.language-flag {
  max-width: 2rem;
}

/* Sizing */
/* Full size */
.navbar-full {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  justify-items: center;
}

.navbar-medium {
  display: none;
}

.navbar-minimal {
  display: none;
}

/* Medium size */
@media screen and (max-width: 1440px) {
  .navbar-full {
    display: none;
  }

  .navbar-medium {
    display: grid;
    grid-template-columns: 25% 75%;
    align-items: end;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .navbar-minimal {
    display: none;
  }

  .navbar-section {
    justify-content: right;
    margin-bottom: 0;
  }
}

/* Minimal size */
@media screen and (max-width: 1024px) {
  .navbar-full {
    display: none;
  }

  .navbar-medium {
    display: none;
  }

  .navbar-minimal {
    display: grid;
    grid-template-columns: 60% 40%;
    align-items: end;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .navbar-section {
    justify-content: right;
    margin-bottom: 0;
  }
}

@media screen and (max-width: 500px) {
  .navbar-section {
    gap: 1.5rem;
  }

  .language-flag {
    display: none;
  }
}
</style>