<script setup>
import { useAsset } from '@/utils/hooks'
import LinkButton from './buttons/LinkButton.vue'
import H3 from './headers/H3.vue'
import SecondaryText from './texts/SecondaryText.vue';
import { ref } from 'vue';
import { useThemeStore } from '@/stores/theme';

const props = defineProps([ 'title', 'subtitle', 'cover' ]);

const cover = useAsset(import(`@/assets/${props.cover}.jpg`));
const themeStore = useThemeStore()

const isMouseHovered = ref(false)
const onMouseHover = () => { isMouseHovered.value = true }
const onMouseLeave = () => { isMouseHovered.value = false }
</script>

<template>
  <div class="tile">
    <img :src="cover" class="tile-cover" />
    <div class="tile-texts" :class="[ isMouseHovered ? themeStore.onHoverBackgroundColor : '' ]" @mouseenter="onMouseHover" @mouseleave="onMouseLeave">
        <H3 :text="props.title" />
        <SecondaryText class="tile-subtitle":text="props.subtitle" />
        <LinkButton text="Przeczytaj fragment" />
      </div>
  </div>
</template>

<style scoped>
.tile {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  position: relative;
  border-radius: 0.5rem;
  transition: background 0.5s ease;
}

.tile-texts {
  transition: all 0.5s ease;
  border-radius: 0.5rem;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.tile-cover {
  min-width: 8rem;
  width: 8rem;
  max-width: 8rem;
  min-height: 11rem;
  height: 11rem;
  max-height: 11rem;
  box-shadow: 11px 35px 27px -10px rgba(66, 68, 90, 1);
}

.tile-title {
  font-size: 1.5rem;
  font-weight: lighter;
}

.tile-subtitle {
  text-align: justify;
}

.tile-link {
  color: darkslategray;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.tile-link:hover {
  color: darkgoldenrod;
}

@media screen and (max-width: 1024px) {
  .tile-texts {
    justify-content: center;
  }
}
</style>
