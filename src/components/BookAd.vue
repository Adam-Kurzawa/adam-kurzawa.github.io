<script setup>
import Panel from './Panel.vue'
</script>

<template>
  <div class="ad">
    <Panel maxWidth="750px">
      <div class="h1 font-josefin">Alternata</div>
      <div class="h2 font-josefin">7 historii z alternatywnych światów</div>
      <div class="h3 font-segoe">Nordycka space opera, słowiańskie demony cyberprzestrzeni, pismo starsze niż Wszechświat, objawienie religijne na innej planecie... Debiutancki zbiór opowiadań przeniesie Was w świat skrzywionych rzeczywistości. Odwiedzicie przyszłość bliską i bardzo daleką. Zmienicie losy Ziemi, człowieka i całego Układu Słonecznego. Zdecydujecie o losach marsjańskich kolonii oraz całego Chrześcijaństwa.</div>
      <div class="h3 font-segoe">Zapraszam do lektury!</div>
      <div class="h3 font-segoe">
        Zawiera opowiadania:
        <ul class="stories font-josefin">
          <li>W drodze do Walhalii</li>
          <li>Krzyk pośród Laniakei</li>
          <li>Nowa baśń</li>
          <li>Słowa Wszechświata</li>
          <li>Przesilenie marsjańskie</li>
          <li>Gwiazda czasu</li>
          <li>Konflikt objawień</li>
        </ul>
      </div>
      <div class="h4 font-josefin">Premiera marzec 2025</div>
    </Panel>
    <img src="@/assets/Alternata - mock książki.png" class="book" />
  </div>
</template>

<style scoped>
.ad {
  display: flex;
  justify-content: center;
}

.description {
  transition: padding 0.5s ease;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
  max-width: 750px;
  background-color: rgba(255, 255, 255, 1.0);
}

.stories {
  font-style: normal;
  font-weight: 600;
  font-size: 1.05rem;
  color: #e69b54;
}

.h1 {
  font-style: normal;
  font-weight: 600;
  font-size: 4rem;
  color: #e69b54;
  text-align: center;
  text-transform: uppercase;
}

.h2 {
  text-align: center;
  color: #e69b54;
  font-style: normal;
  font-weight: 200;
  font-size: 1.75rem;
  text-transform: uppercase;
}

.h3 {
  margin-top: 2rem;
  text-align: justify;
}

.h4 {
  text-align: center;
  margin-top: 2rem;
  font-weight: 300;
  font-style: normal;
  font-size: 1.25rem;
  color: white;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  background-color: #e69b54;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 1.25rem;
  padding-top: 1.5rem;
  border-radius: 0.5rem;
}

.book {
  width: 75%;
  height: 75%;
  max-width: 500px;
}

@media screen and (max-width: 1600px) {
  .description {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media screen and (max-width: 1280px) {
  .ad {
    flex-wrap: wrap-reverse;
  }

  .description {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>