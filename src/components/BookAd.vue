<script setup>
import { useThemeStore } from '@/stores/theme'
import { useTranslation } from '@/utils/hooks'
import LinkButton from './buttons/LinkButton.vue'
import TextButton from './buttons/TextButton.vue'
import H1 from './headers/H1.vue'
import H2 from './headers/H2.vue'
import H3 from './headers/H3.vue'
import HomeTile from './HomeTile.vue'
import SecondaryText from './texts/SecondaryText.vue'

const t = useTranslation()
const themeStore = useThemeStore()
</script>

<template>
  <div>
    <div class="ad">
      <div class="ad-left" :class="themeStore.secondaryBackgroundColor">
        <H1 text="Antologia Alternata" colorful="true" />
        <SecondaryText class="ad-description" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua." />
        <TextButton text="Premiera marzec 2026" />
      </div>
      <img src="../assets/alternata_mock.png" class="ad-middle" />
      <div class="ad-right">
        <H3 text="Fragment W drodze do Walhalli" />
        <SecondaryText class="ad-description" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et." />
        <LinkButton text="Przeczytaj fragment" />
      </div>
    </div>
    <div class="others">
      <H2 text="Pozostałe opowiadania antologii" colorful="true" />
      <div class="cols-3">
        <HomeTile
          :title="t('alternata-ad.title_1')"
          subtitle="Laboris dolore pariatur laborum duis occaecat eu reprehenderit excepteur aliquip non anim exercitation reprehenderit."
          cover="laniakea"
        />
        <HomeTile
          :title="t('alternata-ad.title_2')"
          subtitle="Culpa sint non dolor magna incididunt id dolor do pariatur sint do proident."
          cover="nowa_baśń"
        />
        <HomeTile
          :title="t('alternata-ad.title_3')"
          subtitle="Fugiat elit aliqua officia proident aliquip do otinis est amarne equis."
          cover="pismo"
        />
        <HomeTile
          :title="t('alternata-ad.title_4')"
          subtitle="Do commodo duis magna incididunt nostrud officia aliquip officia proident aliquip."
          cover="solstice"
        />
        <HomeTile
          :title="t('alternata-ad.title_5')"
          subtitle="Enim velit aliqua reprehenderit ullamco eiusmod laborum ullamco occaecat amet ex enim deserunt commodo anim."
          cover="alternata_cover"
        />
        <HomeTile
          :title="t('alternata-ad.title_6')"
          subtitle="Enim ea adipisicing labore do occaecat laboris reprehenderit laborum ex officia sit adipisicing tempor laborum."
          cover="alternata_cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ad {
  display: grid;
  grid-template-columns: 60% 40%;
  position: relative;
}

.others {
  padding: 2rem;
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

.cols-3 {
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
  gap: 1.5rem;
}

@media screen and (max-width: 1600px) {
  .cols-3 {
    grid-template-columns: minmax(0, 50%) minmax(0, 50%);
  }
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

  .cols-3 {
    display: flex;
    flex-direction: column;
  }

}
</style>
