<script setup>
import { useTranslation } from "@/utils/hooks";

const t = useTranslation();
</script>

<template>
  <div class="font-segoe welcome">
    {{ t("welcome.text") }}
    <a class="buycoffee font-madimi" target="_blank" href="https://buycoffee.to/"><img src="@/assets/buycoffee.png" /> {{ t("welcome.buycoffee") }}</a>
    {{ t("welcome.text2") }}
    <a class="patronite font-segoe" target="_blank" href="https://patronite.pl/"><img src="@/assets/patronite.png" /> {{ t("welcome.patronite") }}</a>
    .
  </div>
</template>

<style scoped>
.welcome {
  text-align: center;
  font-size: 1.25rem;
  line-height: 2rem;
  color: white;
  font-weight: bold;
  padding: 2rem;
  background: url('../assets/handwriting.webp') no-repeat center center / cover;
  box-shadow: 0 0 2rem gainsboro;
  cursor: pointer;
}

.buycoffee {
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

.buycoffee img {
  position: relative;
  top: 0.2rem;
}

.buycoffee:hover {
  background-color: rgb(107, 199, 230);
}

.buycoffee:active {
  background-color: rgb(61, 187, 230);
}

.patronite {
  text-wrap: nowrap;
  background-color: red;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  font-weight: normal;
  padding-right: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.patronite img {
  width: 2rem;
  max-width: 2rem;
  position: relative;
  top: 0.25rem;
}

.patronite:hover {
  background-color: rgb(192, 0, 0);
}

.patronite:active {
  background-color: rgb(129, 0, 0);
}

@media screen and (max-width: 1024px) {
  .welcome {
    margin-top: 1rem;
  }
}
</style>
