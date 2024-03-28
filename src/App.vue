<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const scrollThreshold = 100
const isScrolled = ref(false)

const makeBackgroundSolid = (event) => {
  isScrolled.value = window.scrollY > scrollThreshold
}

window.addEventListener('scroll', makeBackgroundSolid)
</script>

<template>
  <header>
    <div>
      <nav class="navbar" :class="[ isScrolled ? 'navbar-solid' : 'navbar-gradient' ]">
        <div class="navbar-section left-section">
          <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'powstanie_na_brillar' } }" class="navlink">Powstanie na Brillar</RouterLink>
          <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'klątwa_imetheru' } }" class="navlink">Klątwa Imetheru</RouterLink>
          <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'projekt_eclipse' } }" class="navlink">Projekt Eclipse</RouterLink>
          <RouterLink :to="{ name: 'reader', params: { lang: 'pl', title: 'egzorcyzmy_emily_os' } }" class="navlink">Egzorcyzmy Emily OS</RouterLink>
        </div>
        <RouterLink to="/" class="logo">Alternata</RouterLink>
        <div class="navbar-section">
          <RouterLink to="/" class="navlink">Opowiadania</RouterLink>
          <RouterLink to="/" class="navlink">Książki</RouterLink>
          <RouterLink to="/" class="navlink">O mnie</RouterLink>
          <RouterLink to="/" class="navlink">Kontakt</RouterLink>
          <RouterLink to="/" class="navlink">ENG</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <div class="content">
    <RouterView :key="$route.fullPath"/>  
  </div>
</template>

<style scoped>
.content {
  transition: padding 0.5s ease;
  margin-top: 10rem;
  margin-bottom: 5rem;
  padding-left: 20rem;
  padding-right: 20rem;
}

.navbar-gradient {
  background: linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%);
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
  display: grid;
  grid-template-columns: 45% 10% 45%;
  align-items: end;
  justify-items: center;
}

.navbar-section {
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

.navlink {
  color: white;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: lighter;
}

@media screen and (max-width: 1920px) {
  .content {
    padding-left: 12rem;
    padding-right: 12rem;
  }
}

@media screen and (max-width: 1600px) {
  .content {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}

@media screen and (max-width: 1280px) {
  .content {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 1024px) {
  .content {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .navlink {
    display: none;
  }

  .content {
    margin-top: 5rem;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>