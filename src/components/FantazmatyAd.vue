<script setup>
import { useThemeStore } from '@/stores/theme'
import { useTranslation } from '@/utils/hooks'
import LinkButton from './buttons/LinkButton.vue'
import TextButton from './buttons/TextButton.vue'
import SecondaryText from './texts/SecondaryText.vue'
import H1 from './headers/H1.vue'
import H3 from './headers/H3.vue'
import { computed } from 'vue'

const t = useTranslation()
const themeStore = useThemeStore()

const backgroundColor = computed(() => `ad-background-${themeStore.currentTheme}`)
</script>

<template>
    <div class="ad-content" :class="backgroundColor">
      <div class="ad-flex ad-spacer">
        <div class="ad-flex">
          <H1 text="Antologia Fantazmaty VI" colorful="true" />
          <LinkButton text="Strona wydawcy" url="https://fantazmaty.pl/czytaj/antologie/#fantazmaty-3" />
        </div>
        <div class="ad-flex">
          <H3 text="Fragment Egzorcyzmy Emily OS" class="gainsboro" />
          <SecondaryText class="ad-description gainsboro" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et." />
          <LinkButton text="Przeczytaj fragment" />
        </div>
      </div>
      <img src="https://fantazmaty.pl/wp-content/uploads/2023/04/Fantazmaty-3-optimized.jpg" class="ad-middle" />
    </div>
</template>

<style scoped>
.ad-background-light {
  background: rgb(82, 0, 71);
}

.ad-background-sepia {
  background: rgb(83, 7, 73);
}

.ad-background-dark {
  background: rgb(41, 16, 37);
}

.gainsboro {
  color: gainsboro !important;
}

.ad-content {
  display: grid;
  grid-template-columns: auto 15rem;
  gap: 2rem;
  border-radius: 0.5rem;
  padding: 2rem;
}

.ad-spacer {
  justify-content: space-between;
}

.ad-flex {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ad-middle {
  width: 15rem;
  height: auto;
  box-shadow: 11px 35px 27px -10px rgba(66, 68, 90, 1);
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

.ad-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.ad-link:hover {
  color: darkgoldenrod;
}

.ad-description {
  text-align: justify;
}

@media screen and (max-width: 1024px) {
  .ad {
    display: flex;
    flex-direction: column;
  }

  .ad-middle {
    left: calc(100% - 22rem);
  }

}
</style>
