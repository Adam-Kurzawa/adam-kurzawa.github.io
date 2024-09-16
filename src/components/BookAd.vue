<script setup>
import { useTranslation } from "@/utils/hooks";
import Panel from "./Panel.vue";

const t = useTranslation();
</script>

<template>
  <div class="ad">
    <div class="ad-left">
      <div class="h1 font-yeseva">Antologia "Alternata"</div>
      <div class="font-segoe">Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua.</div>
      <span class="ad-button font-segoe">Premiera marzec 2026</span>
    </div>
    <img src="../assets/alternata_mock.png" class="ad-middle" />
    <div class="ad-right">
      <div class="h2 font-yeseva">Fragment "W drodze do Walhalli"</div>
      <div class="font-segoe">Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et.</div>
      <span class="ad-link font-segoe">Przeczytaj fragment ↦</span>
    </div>
  </div>
</template>

<style scoped>
.ad {
  display: grid;
  grid-template-columns: 60% 40%;
  position: relative;
}

.ad-left {
  background-color: gainsboro;
  padding: 2rem;
  padding-right: 12rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 0.5rem;
}

.ad-middle {
  position: absolute;
  width: 20rem;
  top: 2rem;
  left: calc(60% - 10rem);
  height: auto;
  box-shadow: 11px 35px 27px -10px rgba(66, 68, 90, 1);
}

.ad-right {
  padding: 2rem;
  padding-left: 12rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ad-button {
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.6rem;
  width: fit-content;
  color: white;
  background-color: darkslategray;
  font-size: 1.25rem;
  font-weight: lighter;
  cursor: pointer;
}

.ad-button:hover {
  background-color: darkgoldenrod;
}

.ad-link {
  color: darkslategray;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.ad-link:hover {
  color: darkgoldenrod;
}

.h1 {
  font-size: 2rem;
}

.h2 {
  font-size: 1.75rem;
  font-weight: lighter;
}
</style>
