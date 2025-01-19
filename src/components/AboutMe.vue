<script setup>
import { useThemeStore } from '@/stores/theme'
import { useInnerWidth, useTranslation } from '@/utils/hooks'
import LinkButton from './buttons/LinkButton.vue'
import TextButton from './buttons/TextButton.vue'
import H1 from './headers/H1.vue'
import H2 from './headers/H2.vue'
import H3 from './headers/H3.vue'
import HomeTile from './HomeTile.vue'
import SecondaryText from './texts/SecondaryText.vue'
import { ref } from 'vue'
import ProfileButton from './buttons/ProfileButton.vue'

const t = useTranslation()
const themeStore = useThemeStore()

const isMouseHovered = ref(false)
const onMouseHover = () => { isMouseHovered.value = true }
const onMouseLeave = () => { isMouseHovered.value = false }

const links = ref([
  {
    name: "Nowa Fantastyka",
    profile: "TheEagle",
    link: "nowafantastyka.pl/theEagle",
    icon: "nf.png"
  },
  {
    name: "Medium",
    profile: "TheEagle",
    link: "nowafantastyka.pl/theEagle",
    icon: "medium.svg"
  }
])
</script>

<template>
  <div class="bio">
    <img src="../assets/pismo.jpg" class="photo" />
    <div class="bio-data" :class="[ themeStore.secondaryBackgroundColor, isMouseHovered ? themeStore.onHoverBackgroundColor : '' ]" @mouseenter="onMouseHover" @mouseleave="onMouseLeave">
      <H1 text="Adam Kurzawa" colorful="true" />
      <SecondaryText class="ad-description" text="Nostrud sunt adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. adipisicing Lorem commodo ipsum. Ex magna adipisicing ullamco fugiat et sit minim eu Lorem ad irure et. Esse id ut reprehenderit in proident fugiat exercitation labore ullamco tempor. Aliquip culpa sunt ex ipsum sint do nisi ut commodo fugiat ad. Aute ad culpa consequat aliqua." />
      <div class="links">
        <ProfileButton v-for="link in links" :header="link.name" :description="link.profile" :image="link.icon" :action="() => alert(`Redirect to ${link.link}`)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo {
  width: 20rem;
  height: auto;
  box-shadow: 11px 35px 27px -10px rgba(66, 68, 90, 1);
}

.bio {
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.bio-data {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 0.5rem;
  transition: background 0.5s ease;
}

.links {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
