<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Submenu from './Submenu.vue';

const scrollThreshold = 100
const isScrolled = ref(false)

const makeBackgroundSolid = (event) => {
  isScrolled.value = window.scrollY > scrollThreshold
}

window.addEventListener('scroll', makeBackgroundSolid)
</script>

<template>
  <nav class="navbar" :class="[isScrolled ? 'navbar-solid' : 'navbar-gradient']">
    <span class="navbar-full">
      <span class="navbar-section">
        <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'powstanie_na_brillar' } }" class="navlink">Powstanie na Brillar</RouterLink>
        <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'klątwa_imetheru' } }" class="navlink">Klątwa Imetheru</RouterLink>
        <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'projekt_eclipse' } }" class="navlink">Projekt Eclipse</RouterLink>
        <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Egzorcyzmy Emily OS</RouterLink>
      </span>
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <RouterLink to="/" class="navlink">Opowiadania</RouterLink>
        <RouterLink to="/" class="navlink">Książki</RouterLink>
        <RouterLink to="/" class="navlink">Blog</RouterLink>
        <RouterLink to="/" class="navlink">O mnie</RouterLink>
        <RouterLink to="/" class="navlink">ENG</RouterLink>
      </span>
    </span>
    <span class="navbar-medium">
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <Submenu label="Opowiadania" id="menu-stories-medium">
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'powstanie_na_brillar' } }" class="navlink">Powstanie na Brillar</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'klątwa_imetheru' } }" class="navlink">Klątwa Imetheru</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'projekt_eclipse' } }" class="navlink">Projekt Eclipse</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Egzorcyzmy Emily OS</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Wszystkie</RouterLink></li>
        </Submenu>
        <Submenu label="Ksiazki" id="menu-books-medium">
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Karmazynowe gwiazdy</RouterLink></li>
          <li class="collapsed-link"><RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Wszystkie</RouterLink></li>
        </Submenu>
        <RouterLink to="/" class="navlink">Blog</RouterLink>
        <RouterLink to="/" class="navlink">O mnie</RouterLink>
        <RouterLink to="/" class="navlink">ENG</RouterLink>
      </span>
    </span>
    <span class="navbar-minimal">
      <RouterLink to="/" class="logo">Alternata</RouterLink>
      <span class="navbar-section">
        <Submenu id="menu-overflow-minimal" right="true">
          <li class="collapsed-link"><RouterLink to="/" class="navlink">Opowiadania</RouterLink></li>
          <li class="collapsed-link"><RouterLink to="/" class="navlink">Książki</RouterLink></li>
          <li class="collapsed-link"><RouterLink to="/" class="navlink">Blog</RouterLink></li>
          <li class="collapsed-link"><RouterLink to="/" class="navlink">O mnie</RouterLink></li>
        </Submenu>
        <RouterLink to="/" class="navlink">ENG</RouterLink>
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
}

.collapsed-link {
  margin-top: 1rem;
}

/* Sizing */
/* Full size */
.navbar-full {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  align-items: end;
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
    grid-template-columns: 75% 25%;
    align-items: end;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .navbar-section {
    justify-content: right;
  }
}

@media screen and (max-width: 500px) {
  .navbar-section {
    gap: 1.5rem;
  }
}
</style>