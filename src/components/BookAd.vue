<script setup>
import { useThemeStore } from '@/stores/theme'
import { useTranslation } from '@/utils/hooks'
import LinkButton from './LinkButton.vue'
import TextButton from './TextButton.vue'
import H1 from './H1.vue'
import H3 from './H3.vue'
import SecondaryText from './SecondaryText.vue'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
  <div class="ad">
    <div class="ad-left" :class="themeStore.secondaryBackgroundColor">
      <H1 text="Antologia Alternata" colorful="true" />
      <SecondaryText class="ad-description" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua." />
      <TextButton text="Premiera marzec 2026" />
    </div>
    <img src="../assets/alternata_mock.png" class="ad-middle" />
    <div class="ad-right">
      <H3 text="Fragment W drodze do Walhalli" />
      <SecondaryText class="ad-description" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et." />
      <LinkButton text="Przeczytaj fragment" />
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

.ad-description {
  text-align: justify;
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
  font-size: 1rem;
  font-weight: lighter;
  cursor: pointer;
}

.ad-button:hover {
  background-color: darkgoldenrod;
}

.ad-link {
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.ad-link:hover {
  color: darkgoldenrod;
}

@media screen and (max-width: 1024px) {
  .ad {
    display: flex;
    flex-direction: column;
  }

  .ad-left {
    padding-right: 24rem;
  }

  .ad-middle {
    left: calc(100% - 22rem);
  }

  .ad-right {
    padding-right: 2rem;
    padding-left: 2rem;
  }

}
</style>
