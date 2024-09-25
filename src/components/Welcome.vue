<script setup>
import { useThemeStore } from '@/stores/theme'
import { useTranslation } from '@/utils/hooks'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
  <div class="font-segoe welcome" :class="themeStore.primaryTextColor">
    {{ t("welcome.text") }}
    <a class="welcome-buycoffee font-madimi" target="_blank" href="https://buycoffee.to/"><img src="@/assets/buycoffee.png" /> {{ t("welcome.buycoffee") }}</a>
    {{ t("welcome.text2") }}
    <a class="welcome-patronite font-segoe" target="_blank" href="https://patronite.pl/"><img src="@/assets/patronite.png" /> {{ t("welcome.patronite") }}</a>
    .
  </div>
</template>

<style scoped>
.welcome {
  text-align: center;
  font-size: 1.15rem;
  font-weight: lighter;
  line-height: 2rem;
  padding: 2rem;
  transition: color 0.5s ease;
}

.welcome-buycoffee {
  text-wrap: nowrap;
  background-color: lightblue;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  font-weight: normal;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.welcome-buycoffee img {
  position: relative;
  top: 0.2rem;
}

.welcome-buycoffee:hover {
  background-color: rgb(107, 199, 230);
}

.welcome-buycoffee:active {
  background-color: rgb(61, 187, 230);
}

.welcome-patronite {
  text-wrap: nowrap;
  background-color: #ff5e5e;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  font-weight: normal;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.welcome-patronite img {
  width: 1.75rem;
  max-width: 1.75rem;
  position: relative;
  top: 0.25rem;
}

.welcome-patronite:hover {
  background-color: rgb(255, 73, 73);
}

.welcome-patronite:active {
  background-color: rgb(233, 46, 46);
}

@media screen and (max-width: 1024px) {
  .welcome {
    margin-top: 1rem;
  }
}
</style>
