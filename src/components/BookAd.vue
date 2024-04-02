<script setup>
import Panel from './Panel.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="ad">
    <Panel rounded="true">
      <div class="h1 font-josefin">Alternata</div>
      <div class="h2 font-josefin">{{ t("alternata-ad.h2") }}</div>
      <div class="h3 font-segoe">{{ t("alternata-ad.h3_0") }}</div>
      <div class="h3 font-segoe">{{ t("alternata-ad.h3_1") }}</div>
      <div class="h3 font-segoe">
        {{ t("alternata-ad.h3_2") }}
        <ul class="stories font-josefin">
          <li>{{ t("alternata-ad.title_0") }}</li>
          <li>{{ t("alternata-ad.title_1") }}</li>
          <li>{{ t("alternata-ad.title_2") }}</li>
          <li>{{ t("alternata-ad.title_3") }}</li>
          <li>{{ t("alternata-ad.title_4") }}</li>
          <li>{{ t("alternata-ad.title_5") }}</li>
          <li>{{ t("alternata-ad.title_6") }}</li>
        </ul>
      </div>
      <div class="h4 font-josefin">{{ t("alternata-ad.h4") }}</div>
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