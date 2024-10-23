<script setup>
import { useAsset } from '@/utils/hooks'
import LinkButton from './LinkButton.vue'
import H3 from './H3.vue'
import SecondaryText from './SecondaryText.vue';
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
  <div class="tile " :class="[ isMouseHovered ? themeStore.secondaryBackgroundColor : '' ]" @mouseenter="onMouseHover" @mouseleave="onMouseLeave">
    <img :src="cover" class="tile-cover" />
    <div class="tile-texts">
        <H3 :text="props.title" />
        <SecondaryText class="tile-subtitle":text="props.subtitle" />
    </div>
    <LinkButton text="Przeczytaj fragment" />
  </div>
</template>

<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 2rem;
  padding-left: 6rem;
  margin-left: 4rem;
  justify-content: space-between;
  border-radius: 0.5rem;
  transition: background 1s ease;
}

.tile-texts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tile-cover {
  position: absolute;
  width: 8rem;
  height: 11rem;
  left: -4rem;
  top: calc(50% - 5.5rem);
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
</style>
