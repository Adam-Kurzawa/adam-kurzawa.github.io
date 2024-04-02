<script setup>
import { ref } from 'vue';

const props = defineProps(['label', 'id', 'right'])

const selected = ref(false)

const selectOnHover = () => {
  selected.value = true
}

const deselectOnLeave = () => {
  selected.value = false
}
</script>

<template>
  <div class="collapsible-menu" @mouseleave="deselectOnLeave">
    <input class="hidden-checkbox" type="checkbox" :id="props.id" v-model="selected">
    <label class="navlink" v-if="props.label" :for="props.id" @mouseenter="selectOnHover">{{ props.label }}</label>
    <label v-if="!props.label" :for="props.id" @mouseenter="selectOnHover"><img class="hamburger" src="@/assets/hamburger.png" /></label>
    <div class="menu-content" :class="[ props.right ? 'to-right' : '' ]">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Collapsable menu */
.menu-content {
  position: absolute;
  padding-left: 1rem;
  padding-right: 1rem;

  max-height: 0;
  overflow: hidden;
}

.to-right {
  right: 2rem;
}

.collapsible-menu ul {
  list-style-type: none;
  padding: 0;
}

.collapsible-menu a {
  display: block;
  padding: 10px;
  text-decoration: none;
}

.collapsible-menu label {
  display: block;
  cursor: pointer;
}

.hidden-checkbox {
  display: none;
}

input:checked~.menu-content {
  max-height: fit-content;
  height: fit-content;
  z-index: 1;
  background-color: rgb(30, 54, 54);
  border: 1px #e69b54 solid;
  border-radius: 0.5rem;
}

.hamburger {
  margin-top: 0.75rem;
  width: 1.5rem;
}
</style>