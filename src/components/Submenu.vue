<script setup>
import { useThemeStore } from '@/stores/theme';
import { ref } from 'vue'

const props = defineProps(['label', 'id'])
const themeStore = useThemeStore()

const selected = ref(false)

const selectOnHover = () => {
  selected.value = true
}

const deselectOnLeave = () => {
  selected.value = false
}
</script>

<template>
  <div class="submenu" @mouseleave="deselectOnLeave">
    <input class="submenu-hidden-checkbox" type="checkbox" :id="props.id" v-model="selected">
    <label class="navlink" :class="themeStore.primaryTextColor" v-if="props.label" :for="props.id" @mouseenter="selectOnHover">{{ props.label }}</label>
    <label v-if="!props.label" :for="props.id" @mouseenter="selectOnHover"><img class="submenu-hamburger" src="@/assets/hamburger.png" /></label>
    <div class="submenu-content" :class="themeStore.primaryBackgroundColor">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Collapsable menu */
.submenu-content {
  position: absolute;
  padding-left: 1rem;
  padding-right: 1rem;
  max-height: 0;
  overflow: hidden;
}

.to-right {
  right: 2rem;
}

.submenu ul {
  list-style-type: none;
  padding: 0;
}

.submenu a {
  display: block;
  padding: 10px;
  text-decoration: none;
}

.submenu label {
  display: block;
  cursor: pointer;
}

.submenu-hidden-checkbox {
  display: none;
}

input:checked~.submenu-content {
  max-height: fit-content;
  height: fit-content;
  z-index: 1;
  background-color: rgb(30, 54, 54);
  border: 1px #e69b54 solid;
  border-radius: 0.5rem;
}

.submenu-hamburger {
  margin-top: 0.75rem;
  width: 1.5rem;
}
</style>