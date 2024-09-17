<script setup>
import Welcome from "@/components/Welcome.vue";
import BookAd from "@/components/BookAd.vue";
import HomeTile from "@/components/HomeTile.vue";
import { useTranslation } from "@/utils/hooks";
import FantasmatyAd from "@/components/FantasmatyAd.vue";

const t = useTranslation();
</script>

<template>
  <main class="welcome-container">
    <Welcome />
    <BookAd />
    <div>
      <h2>Inne opowiadania antologii</h2>
      <div class="cols-3">
        <HomeTile
          :title="t('alternata-ad.title_1')"
          subtitle="Laboris dolore pariatur laborum duis occaecat eu reprehenderit excepteur aliquip non anim exercitation reprehenderit."
          cover="alternata_cover"
        />
        <HomeTile
          :title="t('alternata-ad.title_2')"
          subtitle="Culpa sint non dolor magna incididunt id dolor do pariatur sint do proident."
          cover="alternata_cover"
        />
        <HomeTile
          :title="t('alternata-ad.title_3')"
          subtitle="Fugiat elit aliqua officia proident aliquip do otinis est amarne equis."
          cover="alternata_cover"
        />
        <HomeTile
          :title="t('alternata-ad.title_4')"
          subtitle="Do commodo duis magna incididunt nostrud officia aliquip officia proident aliquip."
          cover="alternata_cover"
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
    <FantasmatyAd />
  </main>
</template>

<style scoped>
.cols-3 {
  display: grid;
  grid-template-columns: minmax(0, 33%) minmax(0, 34%) minmax(0, 33%);
  gap: 2rem;
  margin-bottom: 2rem;
}

.welcome-container {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

@media screen and (max-width: 1600px) {
  .cols-3 {
    grid-template-columns: minmax(0, 50%) minmax(0, 50%);
  }
}

@media screen and (max-width: 1024px) {
  .welcome-container {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .cols-3 {
    display: flex;
    flex-direction: column;
  }
}
</style>
