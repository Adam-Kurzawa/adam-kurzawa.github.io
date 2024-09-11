<script setup>
import { useTranslation } from '@/utils/hooks';
import Panel from './Panel.vue'

const t = useTranslation()
</script>

<template>
  <div class="ad">
      <div class="h1 font-josefin">Alternata</div>
      <div class="h2 font-josefin">{{ t("alternata-ad.h2") }}</div>
      <div class="h3 font-segoe">{{ t("alternata-ad.h3_0") }}</div>
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
  </div>
</template>

<style scoped>
.ad {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: url('../assets/alternata_cover.jpg') no-repeat center center / cover;
  box-shadow: 0 0 2rem gainsboro;
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
  color: white;
}

.h1 {
  font-style: normal;
  padding-top: 2rem;
  font-weight: 600;
  font-size: 4rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
}

.h2 {
  text-align: center;
  color: white;
  font-style: normal;
  font-weight: 200;
  font-size: 1.75rem;
  text-transform: uppercase;
}

.h3 {
  margin-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  text-align: justify;
  color: white;
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
  background-color: rgba(0, 4, 255, 0.25);
  backdrop-filter: blur(10px);
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 1.25rem;
  padding-top: 1.5rem;
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